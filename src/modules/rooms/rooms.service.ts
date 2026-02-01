import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { RoomsDao } from './dao/rooms.dao';

@Injectable()
export class RoomsService {
  constructor(private readonly roomsDao: RoomsDao) {}

  async getMyRooms(userId: string) {
    return this.roomsDao.findRoomsByUser(userId);
  }

  async joinRoom(accessCode: string, userId: string) {
    const room = await this.roomsDao.findByAccessCode(accessCode);
    if (!room || !room.isActive) {
      throw new NotFoundException('Sala no disponible');
    }

    const alreadyJoined = await this.roomsDao.isUserInRoom(userId, room.id);
    if (!alreadyJoined) {
      await this.roomsDao.addUserToRoom(userId, room.id);
    }

    return {
      id: room.id,
      title: room.title,
    };
  }
}
