import { Injectable } from '@nestjs/common';
import { Prisma, Room } from '@prisma/client';
import { PrismaService } from '../../../database/prisma/prisma.service';

@Injectable()
export class RoomsDao {
  constructor(private readonly prisma: PrismaService) {}

  findByAccessCode(code: string): Promise<Room | null> {
    return this.prisma.room.findUnique({
      where: { accessCode: code },
    });
  }

  findById(id: string): Promise<Room | null> {
    return this.prisma.room.findUnique({
      where: { id },
    });
  }

  findAll(): Promise<Room[]> {
    return this.prisma.room.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  create(data: Prisma.RoomCreateInput) {
    return this.prisma.room.create({ data });
  }

  update(id: string, data: Prisma.RoomUpdateInput) {
    return this.prisma.room.update({
      where: { id },
      data,
    });
  }
}
