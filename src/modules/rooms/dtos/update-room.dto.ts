import { IsEnum, IsOptional, IsString } from 'class-validator';
import { RoomStatus } from './create-room.dto';

export class UpdateRoomDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(RoomStatus)
  status?: RoomStatus;
}
