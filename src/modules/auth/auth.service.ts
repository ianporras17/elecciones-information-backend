import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../database/prisma/prisma.service';
import { RegisterAdminDto } from './dto/register-admin.dto';
import { LoginDto } from './dto/login.dto';
import { RoleEnum } from './role.enum';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  /**
   * Registro de administrador (WEB)
   */
  async registerAdmin(dto: RegisterAdminDto) {
    // Verificar duplicados
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: dto.email }, { name: dto.username }],
      },
    });

    if (existingUser) {
      throw new ConflictException(
        'El correo o nombre de usuario ya está registrado',
      );
    }

    // Hash seguro de contraseña
    const passwordHash = await bcrypt.hash(dto.password, 10);

    // Crear usuario ADMIN usando enum RoleEnum
    await this.prisma.user.create({
      data: {
        name: dto.username,
        email: dto.email,
        passwordHash,
        role: RoleEnum.ADMIN, 
      },
    });

    // No se retorna información sensible
    return { message: 'Administrador registrado correctamente' };
  }

  /**
   * Login administrador (WEB)
   */
  async loginAdmin(dto: LoginDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: dto.identifier }, { name: dto.identifier }],
      },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Comparar contraseña
    const passwordValid = await bcrypt.compare(
      dto.password,
      user.passwordHash,
    );

    if (!passwordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Verificar rol ADMIN usando enum RoleEnum
    if (user.role !== RoleEnum.ADMIN) {
      throw new UnauthorizedException('Acceso no autorizado');
    }

    // Generar token JWT
    const access_token = await this.jwt.signAsync({
      sub: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    });

    return {
      access_token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }
}
