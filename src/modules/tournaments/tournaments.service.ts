import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { TournamentsDao } from './dao/tournaments.dao';
import { TournamentStatus } from '@prisma/client';

function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

@Injectable()
export class TournamentsService {
  constructor(private readonly dao: TournamentsDao) {}

  async startTournament(roomId: string, topicId: string, userId: string) {
    const member = await this.dao.isMember(roomId, userId);
    if (!member) throw new ForbiddenException('No perteneces a la sala');

    const room = await this.dao.getRoom(roomId);
    if (!room) throw new NotFoundException('Sala no existe');
    if (!room.isActive) throw new ForbiddenException('La sala está inactiva');

    const topic = await this.dao.getTopic(topicId);
    if (!topic || topic.roomId !== roomId) throw new NotFoundException('Topic inválido para esta sala');

    const candidates = await this.dao.listCandidatesWithProposal(roomId, topicId);
    const usable = candidates.filter(c => (c.proposals?.[0]?.content ?? '').trim().length > 0);

    if (usable.length < 2) {
      throw new BadRequestException('Se requieren al menos 2 candidatos con propuesta para este topic');
    }

    // Simplificamos: número par (evitamos byes)
    if (usable.length % 2 !== 0) {
      throw new BadRequestException('Para el torneo se requiere un número PAR de candidatos con propuesta');
    }

    const tournament = await this.dao.createTournament(roomId, topicId, userId);

    const ids = shuffle(usable.map(c => c.id));
    const pairs: Array<{ a: string; b: string; order: number }> = [];

    for (let i = 0; i < ids.length; i += 2) {
      pairs.push({ a: ids[i], b: ids[i + 1], order: i / 2 });
    }

    await this.dao.createMatches(tournament.id, 1, pairs);

    const next = await this.dao.getNextPendingMatch(tournament.id);
    return {
      tournament: { id: tournament.id, status: tournament.status, roomId, topicId },
      match: this.toMatchDTO(next, topicId),
    };
  }

  async getNextMatch(tournamentId: string, userId: string) {
    const tournament = await this.dao.getTournament(tournamentId);
    if (!tournament) throw new NotFoundException('Torneo no existe');
    if (tournament.userId !== userId) throw new ForbiddenException('No puedes ver este torneo');

    if (tournament.status === TournamentStatus.COMPLETED) {
      return { tournament: { id: tournament.id, status: tournament.status }, match: null, winner: null };
    }

    const next = await this.dao.getNextPendingMatch(tournamentId);
    return {
      tournament: { id: tournament.id, status: tournament.status },
      match: this.toMatchDTO(next, tournament.topicId),
    };
  }

  async decide(matchId: string, winnerId: string, userId: string) {
    const match = await this.dao.findMatch(matchId);
    if (!match) throw new NotFoundException('Match no existe');

    const tournament = match.tournament;
    if (tournament.userId !== userId) throw new ForbiddenException('No puedes decidir este torneo');

    // validar winnerId es A o B
    if (winnerId !== match.optionAId && winnerId !== match.optionBId) {
      throw new BadRequestException('Winner inválido para este match');
    }

    const updated = await this.dao.updateMatchWinner(matchId, winnerId);

    // ¿quedan matches pendientes en el round actual?
    const round = updated.round;
    const matchesRound = await this.dao.listMatchesByRound(updated.tournamentId, round);

    const allDone = matchesRound.every(m => !!m.winnerId);

    if (allDone) {
      const winners = matchesRound.map(m => m.winnerId!) as string[];
      if (winners.length === 1) {
        await this.dao.setTournamentStatus(updated.tournamentId, TournamentStatus.COMPLETED);

        const winner = await this.dao.getCandidateWithProposal(winners[0], tournament.topicId);

        return {
          tournament: { id: updated.tournamentId, status: TournamentStatus.COMPLETED },
          match: null,
          winner,
        };
      }

      if (winners.length % 2 !== 0) {
        throw new BadRequestException('Ronda siguiente requiere cantidad PAR de ganadores');
      }

      // crear siguiente ronda solo si aún no existe
      const nextRound = round + 1;
      const existingNext = await this.dao.listMatchesByRound(updated.tournamentId, nextRound);
      if (existingNext.length === 0) {
        const pairs: Array<{ a: string; b: string; order: number }> = [];
        for (let i = 0; i < winners.length; i += 2) {
          pairs.push({ a: winners[i], b: winners[i + 1], order: i / 2 });
        }
        await this.dao.createMatches(updated.tournamentId, nextRound, pairs);
      }
    }

    const next = await this.dao.getNextPendingMatch(updated.tournamentId);
    return {
      tournament: { id: updated.tournamentId, status: TournamentStatus.IN_PROGRESS },
      match: this.toMatchDTO(next, tournament.topicId),
    };
  }

  private toMatchDTO(match: any, topicId: string) {
    if (!match) return null;

    const aProposal = match.optionA?.proposals?.find((p: any) => p.topicId === topicId)?.content ?? '';
    const bProposal = match.optionB?.proposals?.find((p: any) => p.topicId === topicId)?.content ?? '';

    return {
      id: match.id,
      round: match.round,
      order: match.order,
      optionA: { id: match.optionA.id, name: match.optionA.name, proposal: aProposal },
      optionB: { id: match.optionB.id, name: match.optionB.name, proposal: bProposal },
      winnerId: match.winnerId,
    };
  }
}
