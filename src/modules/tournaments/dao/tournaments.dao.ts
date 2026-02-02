import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma/prisma.service';
import { TournamentStatus } from '@prisma/client';

@Injectable()
export class TournamentsDao {
  constructor(private readonly prisma: PrismaService) {}

  isMember(roomId: string, userId: string) {
    return this.prisma.roomMember.findUnique({
      where: { roomId_userId: { roomId, userId } },
    });
  }

  getTopic(topicId: string) {
    return this.prisma.topic.findUnique({ where: { id: topicId } });
  }

  getRoom(roomId: string) {
    return this.prisma.room.findUnique({ where: { id: roomId } });
  }

  listCandidatesWithProposal(roomId: string, topicId: string) {
    return this.prisma.candidate.findMany({
      where: { roomId },
      include: {
        proposals: {
          where: { topicId },
          select: { content: true },
        },
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  createTournament(roomId: string, topicId: string, userId: string) {
    return this.prisma.tournament.create({
      data: { roomId, topicId, userId, status: TournamentStatus.IN_PROGRESS },
    });
  }

  createMatches(tournamentId: string, round: number, pairs: Array<{ a: string; b: string; order: number }>) {
    return this.prisma.tournamentMatch.createMany({
      data: pairs.map(p => ({
        tournamentId,
        optionAId: p.a,
        optionBId: p.b,
        round,
        order: p.order,
      })),
    });
  }

  getTournament(tournamentId: string) {
    return this.prisma.tournament.findUnique({
      where: { id: tournamentId },
    });
  }

  listMatchesByRound(tournamentId: string, round: number) {
    return this.prisma.tournamentMatch.findMany({
      where: { tournamentId, round },
      orderBy: { order: 'asc' },
      select: { id: true, optionAId: true, optionBId: true, winnerId: true, round: true, order: true },
    });
  }

  findMatch(matchId: string) {
    return this.prisma.tournamentMatch.findUnique({
      where: { id: matchId },
      include: {
        tournament: true,
        optionA: { include: { proposals: true } },
        optionB: { include: { proposals: true } },
      },
    });
  }

  updateMatchWinner(matchId: string, winnerId: string) {
    return this.prisma.tournamentMatch.update({
      where: { id: matchId },
      data: { winnerId },
      select: { id: true, tournamentId: true, round: true, order: true, optionAId: true, optionBId: true, winnerId: true },
    });
  }

  setTournamentStatus(tournamentId: string, status: TournamentStatus) {
    return this.prisma.tournament.update({
      where: { id: tournamentId },
      data: { status },
    });
  }

  // Devuelve el "siguiente match pendiente"
  getNextPendingMatch(tournamentId: string) {
    return this.prisma.tournamentMatch.findFirst({
      where: { tournamentId, winnerId: null },
      orderBy: [{ round: 'asc' }, { order: 'asc' }],
      include: {
        optionA: { include: { proposals: true } },
        optionB: { include: { proposals: true } },
      },
    });
  }

  async getCandidateWithProposal(candidateId: string, topicId: string) {
    const cand = await this.prisma.candidate.findUnique({
        where: { id: candidateId },
        select: {
        id: true,
        name: true,
        proposals: {
            where: { topicId },
            select: { content: true },
        },
        },
    });

    return {
        id: cand?.id,
        name: cand?.name,
        proposal: cand?.proposals?.[0]?.content ?? "",
    };
    }
}
