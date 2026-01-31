import { Module } from '@nestjs/common';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { RoomsDao } from './dao/rooms.dao';

@Module({
  controllers: [RoomsController],
  providers: [RoomsService, RoomsDao],
})
export class RoomsModule {}
