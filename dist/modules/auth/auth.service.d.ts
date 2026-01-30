import { PrismaService } from '../../database/prisma/prisma.service';
import { RegisterAdminDto } from './dto/register-admin.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    registerAdmin(dto: RegisterAdminDto): Promise<{
        message: string;
    }>;
    registerUser(dto: RegisterUserDto): Promise<{
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
    loginUser(dto: LoginDto): Promise<{
        message: string;
        user: {
            id: any;
            name: any;
            email: any;
            role: any;
        };
    }>;
    private ensureUserDoesNotExist;
    private validateUser;
    private buildLoginResponse;
}
