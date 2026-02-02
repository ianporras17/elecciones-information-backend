import { CandidatesService } from './candidates.service';
export declare class CandidatesController {
    private readonly service;
    constructor(service: CandidatesService);
    list(roomId: string): import("@prisma/client").Prisma.PrismaPromise<{
        name: string;
        id: string;
        roomId: string;
    }[]>;
    create(roomId: string, body: {
        name: string;
    }, req: any): Promise<{
        name: string;
        id: string;
        roomId: string;
    }>;
}
