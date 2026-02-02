import { Injectable } from '@nestjs/common';
import { Prisma, Room } from '@prisma/client';
import { PrismaService } from '../../../database/prisma/prisma.service';

@Injectable()
export class RoomsDao {
  constructor(private readonly prisma: PrismaService) {}

  findByAccessCode(code: string): Promise<Room | null> {
    return this.prisma.room.findUnique({ where: { accessCode: code } });
  }

  findById(id: string): Promise<Room | null> {
    return this.prisma.room.findUnique({ where: { id } });
  }

  findAll(): Promise<Room[]> {
    return this.prisma.room.findMany({ orderBy: { createdAt: 'desc' } });
  }

  createWithCreator(
    data: { title: string; description: string | null; accessCode: string; isActive: boolean },
    creatorId: string
  ) {
    return this.prisma.room.create({
      data: {
        ...data,
        members: {
          create: {
            user: { connect: { id: creatorId } },
            role: 'ADMIN',
          },
        },
      },
    });
  }

  upsertMember(roomId: string, userId: string) {
    return this.prisma.roomMember.upsert({
      where: { roomId_userId: { roomId, userId } },
      update: {},
      create: { roomId, userId, role: 'MEMBER' },
    });
  }

  listMembers(roomId: string) {
    return this.prisma.roomMember.findMany({
      where: { roomId },
      include: { user: { select: { id: true, name: true, email: true } } },
      orderBy: { joinedAt: 'asc' },
    });
  }

  update(id: string, data: Prisma.RoomUpdateInput) {
    return this.prisma.room.update({ where: { id }, data });
  }
}
