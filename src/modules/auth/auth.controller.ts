import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAdminDto } from './dto/register-admin.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Registro de administrador (WEB)
   * POST /auth/register/admin
   */
  @Post('register/admin')
  registerAdmin(@Body() dto: RegisterAdminDto) {
    return this.authService.registerAdmin(dto);
  }

  /**
   * Login de administrador (WEB)
   * POST /auth/login/admin
   */
  @Post('login/admin')
  loginAdmin(@Body() dto: LoginDto) {
    return this.authService.loginAdmin(dto);
  }

  /**
   * Registro de usuario (MOBILE)
   * POST /auth/register
   */
  @Post('register')
  registerUser(@Body() dto: RegisterUserDto) {
    return this.authService.registerUser(dto);
  }

  /**
   * Login de usuario (MOBILE)
   * POST /auth/login
   */
  @Post('login')
  loginUser(@Body() dto: LoginDto) {
    return this.authService.loginUser(dto);
  }
}
