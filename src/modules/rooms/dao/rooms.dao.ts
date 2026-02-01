import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma/prisma.service';

@Injectable()
export class RoomsDao {
  constructor(private readonly prisma: PrismaService) {}

  findById(id: string) {
    return this.prisma.room.findUnique({ where: { id } });
  }

  findByAccessCode(accessCode: string) {
    return this.prisma.room.findUnique({ where: { accessCode } });
  }

  findRoomsByUser(userId: string) {
    return this.prisma.room.findMany({
      where: {
        isActive: true,
        users: {
          some: { userId },
        },
      },
      select: {
        id: true,
        title: true,
        isActive: true,
      },
    });
  }

  addUserToRoom(userId: string, roomId: string) {
    return this.prisma.roomUser.create({
      data: { userId, roomId },
    });
  }

  isUserInRoom(userId: string, roomId: string) {
    return this.prisma.roomUser.findUnique({
      where: {
        userId_roomId: { userId, roomId },
      },
    });
  }
}

