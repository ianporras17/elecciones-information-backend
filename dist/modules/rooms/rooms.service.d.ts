import { RoomsDao } from './dao/rooms.dao';
import { CreateRoomDto } from './dtos/create-room.dto';
import { UpdateRoomDto } from './dtos/update-room.dto';
export declare class RoomsService {
    private readonly roomsDao;
    constructor(roomsDao: RoomsDao);
    private generateAccessCode;
    findAll(): Promise<{
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        accessCode: string;
        isActive: boolean;
    }[]>;
    findById(id: string): Promise<{
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        accessCode: string;
        isActive: boolean;
    }>;
    create(dto: CreateRoomDto): Promise<{
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        accessCode: string;
        isActive: boolean;
    }>;
    update(id: string, dto: UpdateRoomDto): import("@prisma/client").Prisma.Prisma__RoomClient<{
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        accessCode: string;
        isActive: boolean;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    join(accessCode: string): Promise<{
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        accessCode: string;
        isActive: boolean;
    }>;
}
