import { Prisma, Room } from '@prisma/client';
import { PrismaService } from '../../../database/prisma/prisma.service';
export declare class RoomsDao {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findByAccessCode(code: string): Promise<Room | null>;
    findById(id: string): Promise<Room | null>;
    findAll(): Promise<Room[]>;
    createWithCreator(data: {
        title: string;
        description: string | null;
        accessCode: string;
        isActive: boolean;
    }, creatorId: string): Prisma.Prisma__RoomClient<{
        description: string | null;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        accessCode: string;
        isActive: boolean;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    listRoomsForUser(userId: string): Prisma.PrismaPromise<{
        description: string | null;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        accessCode: string;
        isActive: boolean;
    }[]>;
    upsertMember(roomId: string, userId: string): Prisma.Prisma__RoomMemberClient<{
        id: string;
        role: import("@prisma/client").$Enums.RoomMemberRole;
        joinedAt: Date;
        userId: string;
        roomId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    listMembers(roomId: string): Prisma.PrismaPromise<({
        user: {
            email: string;
            name: string;
            id: string;
        };
    } & {
        id: string;
        role: import("@prisma/client").$Enums.RoomMemberRole;
        joinedAt: Date;
        userId: string;
        roomId: string;
    })[]>;
    update(id: string, data: Prisma.RoomUpdateInput): Prisma.Prisma__RoomClient<{
        description: string | null;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        accessCode: string;
        isActive: boolean;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
}
