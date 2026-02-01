import { AuthService } from './auth.service';
import { RegisterAdminDto } from './dto/register-admin.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: RegisterAdminDto): Promise<{
        message: string;
    }>;
    login(dto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: string;
            name: string;
            email: string;
            role: "ADMIN";
        };
    }>;
}
