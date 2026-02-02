import { RoomsDao } from './dao/rooms.dao';
export declare class RoomsService {
    private readonly roomsDao;
    constructor(roomsDao: RoomsDao);
    getMyRooms(userId: string): Promise<{
        title: string;
        id: string;
        isActive: boolean;
    }[]>;
    joinRoom(accessCode: string, userId: string): Promise<{
        id: string;
        title: string;
    }>;
}
