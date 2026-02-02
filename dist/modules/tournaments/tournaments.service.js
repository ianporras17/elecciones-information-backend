"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TournamentsService = void 0;
const common_1 = require("@nestjs/common");
const tournaments_dao_1 = require("./dao/tournaments.dao");
const client_1 = require("@prisma/client");
function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
let TournamentsService = class TournamentsService {
    dao;
    constructor(dao) {
        this.dao = dao;
    }
    async startTournament(roomId, topicId, userId) {
        const member = await this.dao.isMember(roomId, userId);
        if (!member)
            throw new common_1.ForbiddenException('No perteneces a la sala');
        const room = await this.dao.getRoom(roomId);
        if (!room)
            throw new common_1.NotFoundException('Sala no existe');
        if (!room.isActive)
            throw new common_1.ForbiddenException('La sala está inactiva');
        const topic = await this.dao.getTopic(topicId);
        if (!topic || topic.roomId !== roomId)
            throw new common_1.NotFoundException('Topic inválido para esta sala');
        const candidates = await this.dao.listCandidatesWithProposal(roomId, topicId);
        const usable = candidates.filter(c => (c.proposals?.[0]?.content ?? '').trim().length > 0);
        if (usable.length < 2) {
            throw new common_1.BadRequestException('Se requieren al menos 2 candidatos con propuesta para este topic');
        }
        if (usable.length % 2 !== 0) {
            throw new common_1.BadRequestException('Para el torneo se requiere un número PAR de candidatos con propuesta');
        }
        const tournament = await this.dao.createTournament(roomId, topicId, userId);
        const ids = shuffle(usable.map(c => c.id));
        const pairs = [];
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
    async getNextMatch(tournamentId, userId) {
        const tournament = await this.dao.getTournament(tournamentId);
        if (!tournament)
            throw new common_1.NotFoundException('Torneo no existe');
        if (tournament.userId !== userId)
            throw new common_1.ForbiddenException('No puedes ver este torneo');
        if (tournament.status === client_1.TournamentStatus.COMPLETED) {
            return { tournament: { id: tournament.id, status: tournament.status }, match: null, winner: null };
        }
        const next = await this.dao.getNextPendingMatch(tournamentId);
        return {
            tournament: { id: tournament.id, status: tournament.status },
            match: this.toMatchDTO(next, tournament.topicId),
        };
    }
    async decide(matchId, winnerId, userId) {
        const match = await this.dao.findMatch(matchId);
        if (!match)
            throw new common_1.NotFoundException('Match no existe');
        const tournament = match.tournament;
        if (tournament.userId !== userId)
            throw new common_1.ForbiddenException('No puedes decidir este torneo');
        if (winnerId !== match.optionAId && winnerId !== match.optionBId) {
            throw new common_1.BadRequestException('Winner inválido para este match');
        }
        const updated = await this.dao.updateMatchWinner(matchId, winnerId);
        const round = updated.round;
        const matchesRound = await this.dao.listMatchesByRound(updated.tournamentId, round);
        const allDone = matchesRound.every(m => !!m.winnerId);
        if (allDone) {
            const winners = matchesRound.map(m => m.winnerId);
            if (winners.length === 1) {
                await this.dao.setTournamentStatus(updated.tournamentId, client_1.TournamentStatus.COMPLETED);
                const winner = await this.dao.getCandidateWithProposal(winners[0], tournament.topicId);
                return {
                    tournament: { id: updated.tournamentId, status: client_1.TournamentStatus.COMPLETED },
                    match: null,
                    winner,
                };
            }
            if (winners.length % 2 !== 0) {
                throw new common_1.BadRequestException('Ronda siguiente requiere cantidad PAR de ganadores');
            }
            const nextRound = round + 1;
            const existingNext = await this.dao.listMatchesByRound(updated.tournamentId, nextRound);
            if (existingNext.length === 0) {
                const pairs = [];
                for (let i = 0; i < winners.length; i += 2) {
                    pairs.push({ a: winners[i], b: winners[i + 1], order: i / 2 });
                }
                await this.dao.createMatches(updated.tournamentId, nextRound, pairs);
            }
        }
        const next = await this.dao.getNextPendingMatch(updated.tournamentId);
        return {
            tournament: { id: updated.tournamentId, status: client_1.TournamentStatus.IN_PROGRESS },
            match: this.toMatchDTO(next, tournament.topicId),
        };
    }
    toMatchDTO(match, topicId) {
        if (!match)
            return null;
        const aProposal = match.optionA?.proposals?.find((p) => p.topicId === topicId)?.content ?? '';
        const bProposal = match.optionB?.proposals?.find((p) => p.topicId === topicId)?.content ?? '';
        return {
            id: match.id,
            round: match.round,
            order: match.order,
            optionA: { id: match.optionA.id, name: match.optionA.name, proposal: aProposal },
            optionB: { id: match.optionB.id, name: match.optionB.name, proposal: bProposal },
            winnerId: match.winnerId,
        };
    }
};
exports.TournamentsService = TournamentsService;
exports.TournamentsService = TournamentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tournaments_dao_1.TournamentsDao])
], TournamentsService);
//# sourceMappingURL=tournaments.service.js.map