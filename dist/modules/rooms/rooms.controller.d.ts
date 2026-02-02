import { RoomsService } from './rooms.service';
export declare class RoomsController {
    private readonly roomsService;
    constructor(roomsService: RoomsService);
    getMyRooms(userId: string): Promise<{
        title: string;
        id: string;
        isActive: boolean;
    }[]>;
    joinRoom(body: {
        accessCode: string;
        userId: string;
    }): Promise<{
        id: string;
        title: string;
    }>;
}
