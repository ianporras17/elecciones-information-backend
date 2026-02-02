import { TournamentsService } from './tournaments.service';
export declare class TournamentsController {
    private readonly service;
    constructor(service: TournamentsService);
    start(body: {
        roomId: string;
        topicId: string;
    }, req: any): Promise<{
        tournament: {
            id: string;
            status: import("@prisma/client").$Enums.TournamentStatus;
            roomId: string;
            topicId: string;
        };
        match: {
            id: any;
            round: any;
            order: any;
            optionA: {
                id: any;
                name: any;
                proposal: any;
            };
            optionB: {
                id: any;
                name: any;
                proposal: any;
            };
            winnerId: any;
        } | null;
    }>;
    decision(body: {
        matchId: string;
        winnerId: string;
    }, req: any): Promise<{
        tournament: {
            id: string;
            status: "COMPLETED";
        };
        match: null;
        winner: {
            id: string | undefined;
            name: string | undefined;
            proposal: string;
        };
    } | {
        tournament: {
            id: string;
            status: "IN_PROGRESS";
        };
        match: {
            id: any;
            round: any;
            order: any;
            optionA: {
                id: any;
                name: any;
                proposal: any;
            };
            optionB: {
                id: any;
                name: any;
                proposal: any;
            };
            winnerId: any;
        } | null;
        winner?: undefined;
    }>;
    next(tournamentId: string, req: any): Promise<{
        tournament: {
            id: string;
            status: "COMPLETED";
        };
        match: null;
        winner: null;
    } | {
        tournament: {
            id: string;
            status: "IN_PROGRESS" | "PAUSED";
        };
        match: {
            id: any;
            round: any;
            order: any;
            optionA: {
                id: any;
                name: any;
                proposal: any;
            };
            optionB: {
                id: any;
                name: any;
                proposal: any;
            };
            winnerId: any;
        } | null;
        winner?: undefined;
    }>;
}
