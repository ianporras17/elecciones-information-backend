import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export enum RoomStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export class CreateRoomDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(RoomStatus)
  status: RoomStatus;
}
