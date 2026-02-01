import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import { RegisterAdminDto } from './dto/register-admin.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginDto } from './dto/login.dto';
import { RoleEnum } from './role.enum';
import { PasswordUtil } from '../../utils/password.util';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Registro de administrador
   */
  async registerAdmin(dto: RegisterAdminDto) {
    await this.ensureUserDoesNotExist(dto.email, dto.username);

    const passwordHash = await PasswordUtil.hash(dto.password);

    await this.prisma.user.create({
      data: {
        name: dto.username,
        email: dto.email,
        passwordHash,
        role: RoleEnum.ADMIN,
      },
    });

    return { message: 'Administrador registrado correctamente' };
  }

  /**
   * Registro de usuario (mobile)
   */
  async registerUser(dto: RegisterUserDto) {
    await this.ensureUserDoesNotExist(dto.email, dto.name);

    const passwordHash = await PasswordUtil.hash(dto.password);

    await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        passwordHash,
        role: RoleEnum.USER,
      },
    });

    return { message: 'Usuario registrado correctamente' };
  }

  /**
   * Login administrador
   */
  async loginAdmin(dto: LoginDto) {
    const user = await this.validateUser(dto);

    if (user.role !== RoleEnum.ADMIN) {
      throw new UnauthorizedException('Acceso no autorizado');
    }

    return this.buildLoginResponse(user);
  }

  /**
   * Login usuario (mobile)
   */
  async loginUser(dto: LoginDto) {
    const user = await this.validateUser(dto);

    if (user.role !== RoleEnum.USER) {
      throw new UnauthorizedException('Acceso no autorizado');
    }

    return this.buildLoginResponse(user);
  }

  /**
   * Métodos privados
   */

  private async ensureUserDoesNotExist(email: string, name: string) {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ email }, { name }],
      },
    });

    if (existingUser) {
      throw new ConflictException(
        'El correo o nombre de usuario ya está registrado',
      );
    }
  }

  private async validateUser(dto: LoginDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: dto.identifier }, { name: dto.identifier }],
      },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const passwordValid = await PasswordUtil.compare(
      dto.password,
      user.passwordHash,
    );

    if (!passwordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    return user;
  }

  private buildLoginResponse(user: any) {
    return {
      message: 'Login exitoso',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }
}
