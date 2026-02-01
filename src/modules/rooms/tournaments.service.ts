import { Injectable } from '@nestjs/common';
import { TournamentsDao } from './dao/tournaments.dao';

@Injectable()
export class TournamentsService {
  constructor(private readonly dao: TournamentsDao) {}

  startTournament(roomId: string, topicId: string, userId: string) {
    return this.dao.createTournament({
      roomId,
      topicId,
      userId,
    });
  }

  decide(matchId: string, winnerId: string) {
    return this.dao.updateMatch(matchId, winnerId);
  }
}
