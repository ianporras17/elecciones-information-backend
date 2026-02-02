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
exports.TournamentsDao = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../database/prisma/prisma.service");
const client_1 = require("@prisma/client");
let TournamentsDao = class TournamentsDao {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    isMember(roomId, userId) {
        return this.prisma.roomMember.findUnique({
            where: { roomId_userId: { roomId, userId } },
        });
    }
    getTopic(topicId) {
        return this.prisma.topic.findUnique({ where: { id: topicId } });
    }
    getRoom(roomId) {
        return this.prisma.room.findUnique({ where: { id: roomId } });
    }
    listCandidatesWithProposal(roomId, topicId) {
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
    createTournament(roomId, topicId, userId) {
        return this.prisma.tournament.create({
            data: { roomId, topicId, userId, status: client_1.TournamentStatus.IN_PROGRESS },
        });
    }
    createMatches(tournamentId, round, pairs) {
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
    getTournament(tournamentId) {
        return this.prisma.tournament.findUnique({
            where: { id: tournamentId },
        });
    }
    listMatchesByRound(tournamentId, round) {
        return this.prisma.tournamentMatch.findMany({
            where: { tournamentId, round },
            orderBy: { order: 'asc' },
            select: { id: true, optionAId: true, optionBId: true, winnerId: true, round: true, order: true },
        });
    }
    findMatch(matchId) {
        return this.prisma.tournamentMatch.findUnique({
            where: { id: matchId },
            include: {
                tournament: true,
                optionA: { include: { proposals: true } },
                optionB: { include: { proposals: true } },
            },
        });
    }
    updateMatchWinner(matchId, winnerId) {
        return this.prisma.tournamentMatch.update({
            where: { id: matchId },
            data: { winnerId },
            select: { id: true, tournamentId: true, round: true, order: true, optionAId: true, optionBId: true, winnerId: true },
        });
    }
    setTournamentStatus(tournamentId, status) {
        return this.prisma.tournament.update({
            where: { id: tournamentId },
            data: { status },
        });
    }
    getNextPendingMatch(tournamentId) {
        return this.prisma.tournamentMatch.findFirst({
            where: { tournamentId, winnerId: null },
            orderBy: [{ round: 'asc' }, { order: 'asc' }],
            include: {
                optionA: { include: { proposals: true } },
                optionB: { include: { proposals: true } },
            },
        });
    }
    async getCandidateWithProposal(candidateId, topicId) {
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
};
exports.TournamentsDao = TournamentsDao;
exports.TournamentsDao = TournamentsDao = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TournamentsDao);
//# sourceMappingURL=tournaments.dao.js.map