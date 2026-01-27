import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAdminDto } from './dto/register-admin.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * POST /auth/register
   * Registro de administrador
   */
  @Post('register')
  register(@Body() dto: RegisterAdminDto) {
    return this.authService.registerAdmin(dto);
  }

  /**
   * POST /auth/login
   * Login administrador
   */
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.loginAdmin(dto);
  }
}
