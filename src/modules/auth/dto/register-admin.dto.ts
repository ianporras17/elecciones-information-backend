import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterAdminDto {
  @ApiProperty({
    description: 'Nombre de usuario único para el administrador',
    example: 'admin1',
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'Correo electrónico válido del administrador',
    example: 'admin1@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Contraseña entre 8 y 16 caracteres',
    example: 'secret123',
    minLength: 8,
    maxLength: 16,
  })
  @Length(8, 16)
  password: string;
}
