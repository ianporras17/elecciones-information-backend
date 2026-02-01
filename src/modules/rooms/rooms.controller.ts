import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { RoomsService } from './rooms.service';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get('my/:userId')
  getMyRooms(@Param('userId') userId: string) {
    return this.roomsService.getMyRooms(userId);
  }

  @Post('join')
  joinRoom(@Body() body: { accessCode: string; userId: string }) {
    return this.roomsService.joinRoom(body.accessCode, body.userId);
  }
}
