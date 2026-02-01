import { PrismaService } from '../../database/prisma/prisma.service';
import { RegisterAdminDto } from './dto/register-admin.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly prisma;
    private readonly jwt;
    constructor(prisma: PrismaService, jwt: JwtService);
    registerAdmin(dto: RegisterAdminDto): Promise<{
        message: string;
    }>;
    loginAdmin(dto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: string;
            name: string;
            email: string;
            role: "ADMIN";
        };
    }>;
}
