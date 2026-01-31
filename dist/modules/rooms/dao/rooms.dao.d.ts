import { Prisma, Room } from '@prisma/client';
import { PrismaService } from '../../../database/prisma/prisma.service';
export declare class RoomsDao {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findByAccessCode(code: string): Promise<Room | null>;
    findById(id: string): Promise<Room | null>;
    findAll(): Promise<Room[]>;
    create(data: Prisma.RoomCreateInput): Prisma.Prisma__RoomClient<{
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        accessCode: string;
        isActive: boolean;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    update(id: string, data: Prisma.RoomUpdateInput): Prisma.Prisma__RoomClient<{
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        accessCode: string;
        isActive: boolean;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
}
