import { PrismaService } from '../../../database/prisma/prisma.service';
export declare class RoomsDao {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findById(id: string): import("@prisma/client").Prisma.Prisma__RoomClient<{
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        accessCode: string;
        isActive: boolean;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findByAccessCode(accessCode: string): import("@prisma/client").Prisma.Prisma__RoomClient<{
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        accessCode: string;
        isActive: boolean;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findRoomsByUser(userId: string): import("@prisma/client").Prisma.PrismaPromise<{
        title: string;
        id: string;
        isActive: boolean;
    }[]>;
    addUserToRoom(userId: string, roomId: string): import("@prisma/client").Prisma.Prisma__RoomUserClient<{
        id: string;
        userId: string;
        joinedAt: Date;
        roomId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    isUserInRoom(userId: string, roomId: string): import("@prisma/client").Prisma.Prisma__RoomUserClient<{
        id: string;
        userId: string;
        joinedAt: Date;
        roomId: string;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
