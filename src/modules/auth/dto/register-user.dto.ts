import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  @ApiProperty({
    description: 'Nombre del usuario',
    example: 'juanperez',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Correo electrónico válido',
    example: 'juan@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Contraseña entre 8 y 16 caracteres',
    minLength: 8,
    maxLength: 16,
  })
  @Length(8, 16)
  password: string;
}
