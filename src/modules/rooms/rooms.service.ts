import { Injectable, NotFoundException } from '@nestjs/common';
import { RoomsDao } from './dao/rooms.dao';
import { CreateRoomDto } from './dtos/create-room.dto';
import { UpdateRoomDto } from './dtos/update-room.dto';

@Injectable()
export class RoomsService {
  constructor(private readonly roomsDao: RoomsDao) {}

  private generateAccessCode(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return Array.from({ length: 6 })
      .map(() => chars[Math.floor(Math.random() * chars.length)])
      .join('');
  }

  async create(dto: CreateRoomDto) {
    let code: string;
    let exists = true;

    while (exists) {
      code = this.generateAccessCode();
      exists = await this.roomsDao.findByAccessCode(code);
    }

    return this.roomsDao.create({
      ...dto,
      accessCode: code,
    });
  }

  update(id: string, dto: UpdateRoomDto) {
    return this.roomsDao.update(id, dto);
  }

  async join(accessCode: string) {
    const room = await this.roomsDao.findByAccessCode(accessCode);

    if (!room) {
      throw new NotFoundException('Código inválido');
    }

    return room;
  }
}
