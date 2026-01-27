import { PrismaService } from '../../../database/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RoomsDao {
  constructor(private readonly prisma: PrismaService) {}

  findByAccessCode(code: string) {
    return this.prisma.room.findUnique({
      where: { accessCode: code },
    });
  }

  create(data) {
    return this.prisma.room.create({ data });
  }

  update(id: string, data) {
    return this.prisma.room.update({
      where: { id },
      data,
    });
  }
}
