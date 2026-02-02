import { CandidatesDao } from './dao/candidates.dao';
export declare class CandidatesService {
    private readonly dao;
    constructor(dao: CandidatesDao);
    list(roomId: string): import("@prisma/client").Prisma.PrismaPromise<{
        name: string;
        id: string;
        roomId: string;
    }[]>;
    create(roomId: string, userId: string, name: string): Promise<{
        name: string;
        id: string;
        roomId: string;
    }>;
}
