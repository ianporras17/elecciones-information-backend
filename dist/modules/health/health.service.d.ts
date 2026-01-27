import { PrismaService } from '../../database/prisma/prisma.service';
export declare class HealthService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    ping(): Promise<{
        ok: boolean;
        db: string;
    }>;
}
