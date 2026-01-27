import { PrismaService } from '../../database/prisma/prisma.service';
import { RegisterAdminDto } from './dto/register-admin.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    registerAdmin(dto: RegisterAdminDto): Promise<{
        message: string;
    }>;
    loginAdmin(dto: LoginDto): Promise<{
        message: string;
        user: {
            id: string;
            email: string;
            role: "ADMIN";
        };
    }>;
}
