import { Injectable, NotFoundException } from '@nestjs/common';
import { RoomsDao } from './dao/rooms.dao';
import { CreateRoomDto, RoomStatus } from './dtos/create-room.dto';
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

  findAll() {
    return this.roomsDao.findAll();
  }

  async findById(id: string) {
    const room = await this.roomsDao.findById(id);
    if (!room) throw new NotFoundException('Sala no existe');
    return room;
  }

  async create(dto: CreateRoomDto) {
    let code = '';
    while (true) {
      code = this.generateAccessCode();
      const found = await this.roomsDao.findByAccessCode(code);
      if (!found) break;
    }

    return this.roomsDao.create({
      title: dto.name,
      accessCode: code,
      isActive: dto.status === RoomStatus.ACTIVE,
    });
  }

  update(id: string, dto: UpdateRoomDto) {
    return this.roomsDao.update(id, {
      ...(dto.name !== undefined ? { title: dto.name } : {}),
      ...(dto.status !== undefined ? { isActive: dto.status === RoomStatus.ACTIVE } : {}),
    });
  }

  async join(accessCode: string) {
    const room = await this.roomsDao.findByAccessCode(accessCode);
    if (!room) throw new NotFoundException('Código inválido');
    return room;
  }
}
