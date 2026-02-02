import { PrismaService } from '../../../database/prisma/prisma.service';
import { TournamentStatus } from '@prisma/client';
export declare class TournamentsDao {
    private readonly prisma;
    constructor(prisma: PrismaService);
    isMember(roomId: string, userId: string): import("@prisma/client").Prisma.Prisma__RoomMemberClient<{
        id: string;
        role: import("@prisma/client").$Enums.RoomMemberRole;
        joinedAt: Date;
        userId: string;
        roomId: string;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    getTopic(topicId: string): import("@prisma/client").Prisma.Prisma__TopicClient<{
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        roomId: string;
        topicType: import("@prisma/client").$Enums.TopicType;
        content: string | null;
        order: number;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    getRoom(roomId: string): import("@prisma/client").Prisma.Prisma__RoomClient<{
        description: string | null;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        accessCode: string;
        isActive: boolean;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    listCandidatesWithProposal(roomId: string, topicId: string): import("@prisma/client").Prisma.PrismaPromise<({
        proposals: {
            content: string;
        }[];
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        roomId: string;
    })[]>;
    createTournament(roomId: string, topicId: string, userId: string): import("@prisma/client").Prisma.Prisma__TournamentClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        roomId: string;
        status: import("@prisma/client").$Enums.TournamentStatus;
        topicId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    createMatches(tournamentId: string, round: number, pairs: Array<{
        a: string;
        b: string;
        order: number;
    }>): import("@prisma/client").Prisma.PrismaPromise<import("@prisma/client").Prisma.BatchPayload>;
    getTournament(tournamentId: string): import("@prisma/client").Prisma.Prisma__TournamentClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        roomId: string;
        status: import("@prisma/client").$Enums.TournamentStatus;
        topicId: string;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    listMatchesByRound(tournamentId: string, round: number): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        order: number;
        optionAId: string;
        optionBId: string;
        winnerId: string | null;
        round: number;
    }[]>;
    findMatch(matchId: string): import("@prisma/client").Prisma.Prisma__TournamentMatchClient<({
        tournament: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            roomId: string;
            status: import("@prisma/client").$Enums.TournamentStatus;
            topicId: string;
        };
        optionA: {
            proposals: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                content: string;
                topicId: string;
                candidateId: string;
            }[];
        } & {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            roomId: string;
        };
        optionB: {
            proposals: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                content: string;
                topicId: string;
                candidateId: string;
            }[];
        } & {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            roomId: string;
        };
    } & {
        id: string;
        createdAt: Date;
        order: number;
        tournamentId: string;
        optionAId: string;
        optionBId: string;
        winnerId: string | null;
        round: number;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    updateMatchWinner(matchId: string, winnerId: string): import("@prisma/client").Prisma.Prisma__TournamentMatchClient<{
        id: string;
        order: number;
        tournamentId: string;
        optionAId: string;
        optionBId: string;
        winnerId: string | null;
        round: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    setTournamentStatus(tournamentId: string, status: TournamentStatus): import("@prisma/client").Prisma.Prisma__TournamentClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        roomId: string;
        status: import("@prisma/client").$Enums.TournamentStatus;
        topicId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    getNextPendingMatch(tournamentId: string): import("@prisma/client").Prisma.Prisma__TournamentMatchClient<({
        optionA: {
            proposals: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                content: string;
                topicId: string;
                candidateId: string;
            }[];
        } & {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            roomId: string;
        };
        optionB: {
            proposals: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                content: string;
                topicId: string;
                candidateId: string;
            }[];
        } & {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            roomId: string;
        };
    } & {
        id: string;
        createdAt: Date;
        order: number;
        tournamentId: string;
        optionAId: string;
        optionBId: string;
        winnerId: string | null;
        round: number;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    getCandidateWithProposal(candidateId: string, topicId: string): Promise<{
        id: string | undefined;
        name: string | undefined;
        proposal: string;
    }>;
}
