import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dtos/create-room.dto';
import { UpdateRoomDto } from './dtos/update-room.dto';
import { JoinRoomDto } from './dtos/join-room.dto';
export declare class RoomsController {
    private readonly roomsService;
    constructor(roomsService: RoomsService);
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
    create(dto: CreateRoomDto, req: any): Promise<{
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
    join(dto: JoinRoomDto, req: any): Promise<{
        description: string | null;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        accessCode: string;
        isActive: boolean;
    }>;
    myRooms(req: any): import("@prisma/client").Prisma.PrismaPromise<{
        description: string | null;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        accessCode: string;
        isActive: boolean;
    }[]>;
    members(roomId: string): import("@prisma/client").Prisma.PrismaPromise<({
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
}
