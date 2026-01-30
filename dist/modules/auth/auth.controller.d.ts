import { AuthService } from './auth.service';
import { RegisterAdminDto } from './dto/register-admin.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    registerAdmin(dto: RegisterAdminDto): Promise<{
        message: string;
    }>;
    loginAdmin(dto: LoginDto): Promise<{
        message: string;
        user: {
            id: any;
            name: any;
            email: any;
            role: any;
        };
    }>;
    registerUser(dto: RegisterUserDto): Promise<{
        message: string;
    }>;
    loginUser(dto: LoginDto): Promise<{
        message: string;
        user: {
            id: any;
            name: any;
            email: any;
            role: any;
        };
    }>;
}
