import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma/prisma.service';

@Injectable()
export class CandidatesDao {
  constructor(private readonly prisma: PrismaService) {}

  getMembership(roomId: string, userId: string) {
    return this.prisma.roomMember.findUnique({
      where: { roomId_userId: { roomId, userId } },
      select: { role: true },
    });
  }

  list(roomId: string) {
    return this.prisma.candidate.findMany({
      where: { roomId },
      orderBy: { createdAt: 'asc' },
      select: { id: true, name: true, roomId: true },
    });
  }

  create(roomId: string, name: string) {
    return this.prisma.candidate.create({
      data: { roomId, name },
      select: { id: true, name: true, roomId: true },
    });
  }
}