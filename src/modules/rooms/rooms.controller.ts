import { Body, Controller, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dtos/create-room.dto';
import { UpdateRoomDto } from './dtos/update-room.dto';
import { JoinRoomDto } from './dtos/join-room.dto';
import { AuthGuard } from '@nestjs/passport';
import { ParseUUIDPipe } from '@nestjs/common';

@Controller('rooms')
@UseGuards(AuthGuard('jwt'))
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get()
  findAll() {
    return this.roomsService.findAll();
  }

  @Get('me')
  myRooms(@Req() req: any) {
    return this.roomsService.myRooms(req.user.id);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.roomsService.findById(id);
  }

  @Post()
  create(@Body() dto: CreateRoomDto, @Req() req: any) {
    return this.roomsService.create(dto, req.user.id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateRoomDto) {
    return this.roomsService.update(id, dto);
  }

  @Post('join')
  join(@Body() dto: JoinRoomDto, @Req() req: any) {
    return this.roomsService.join(dto.accessCode, req.user.id);
  }

  @Get(':id/members')
  members(@Param('id') roomId: string) {
    return this.roomsService.members(roomId);
  }
}
