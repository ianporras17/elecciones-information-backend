import { PrismaService } from '../../../database/prisma/prisma.service';
export declare class CandidatesDao {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getMembership(roomId: string, userId: string): import("@prisma/client").Prisma.Prisma__RoomMemberClient<{
        role: import("@prisma/client").$Enums.RoomMemberRole;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    list(roomId: string): import("@prisma/client").Prisma.PrismaPromise<{
        name: string;
        id: string;
        roomId: string;
    }[]>;
    create(roomId: string, name: string): import("@prisma/client").Prisma.Prisma__CandidateClient<{
        name: string;
        id: string;
        roomId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
