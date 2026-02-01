import { RoomsDao } from './dao/rooms.dao';
import { CreateRoomDto } from './dtos/create-room.dto';
import { UpdateRoomDto } from './dtos/update-room.dto';
export declare class RoomsService {
    private readonly roomsDao;
    constructor(roomsDao: RoomsDao);
    private generateAccessCode;
    findAll(): Promise<{
        description: string | null;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        accessCode: string;
        isActive: boolean;
    }[]>;
    findById(id: string): Promise<{
        description: string | null;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        accessCode: string;
        isActive: boolean;
    }>;
    create(dto: CreateRoomDto, creatorId: string): Promise<{
        description: string | null;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        accessCode: string;
        isActive: boolean;
    }>;
    update(id: string, dto: UpdateRoomDto): import("@prisma/client").Prisma.Prisma__RoomClient<{
        description: string | null;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        accessCode: string;
        isActive: boolean;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    join(accessCode: string, userId: string): Promise<{
        description: string | null;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        accessCode: string;
        isActive: boolean;
    }>;
    members(roomId: string): import("@prisma/client").Prisma.PrismaPromise<({
        user: {
            email: string;
            id: string;
            name: string;
        };
    } & {
        id: string;
        role: import("@prisma/client").$Enums.RoomMemberRole;
        joinedAt: Date;
        userId: string;
        roomId: string;
    })[]>;
}
