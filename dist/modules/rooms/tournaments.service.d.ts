import { TournamentsDao } from './dao/tournaments.dao';
export declare class TournamentsService {
    private readonly dao;
    constructor(dao: TournamentsDao);
    startTournament(roomId: string, topicId: string, userId: string): import("@prisma/client").Prisma.Prisma__TournamentClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        roomId: string;
        status: import("@prisma/client").$Enums.TournamentStatus;
        topicId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    decide(matchId: string, winnerId: string): import("@prisma/client").Prisma.Prisma__TournamentMatchClient<{
        id: string;
        createdAt: Date;
        optionA: string;
        optionB: string;
        winner: string | null;
        tournamentId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
