import { PrismaService } from '../../../database/prisma/prisma.service';
export declare class TournamentsDao {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createTournament(data: any): import("@prisma/client").Prisma.Prisma__TournamentClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        roomId: string;
        status: import("@prisma/client").$Enums.TournamentStatus;
        topicId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    createMatch(data: any): import("@prisma/client").Prisma.Prisma__TournamentMatchClient<{
        id: string;
        createdAt: Date;
        optionA: string;
        optionB: string;
        winner: string | null;
        tournamentId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    updateMatch(id: string, winner: string): import("@prisma/client").Prisma.Prisma__TournamentMatchClient<{
        id: string;
        createdAt: Date;
        optionA: string;
        optionB: string;
        winner: string | null;
        tournamentId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
