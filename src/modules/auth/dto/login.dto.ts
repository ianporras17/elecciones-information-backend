import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'Identificador del administrador (puede ser username o email)',
    example: 'admin1@example.com',
  })
  @IsNotEmpty()
  identifier: string; // username o email

  @ApiProperty({
    description: 'Contraseña del administrador',
    example: 'secret123',
  })
  @IsNotEmpty()
  password: string;
}
