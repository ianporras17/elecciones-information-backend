import { TournamentsDao } from './dao/tournaments.dao';
export declare class TournamentsService {
    private readonly dao;
    constructor(dao: TournamentsDao);
    startTournament(roomId: string, topicId: string, userId: string): Promise<{
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
    getNextMatch(tournamentId: string, userId: string): Promise<{
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
    decide(matchId: string, winnerId: string, userId: string): Promise<{
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
    private toMatchDTO;
}
