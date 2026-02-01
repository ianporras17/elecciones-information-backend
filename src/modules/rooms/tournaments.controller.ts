import { Controller, Post, Body } from '@nestjs/common';
import { TournamentsService } from './tournaments.service';

@Controller('tournaments')
export class TournamentsController {
  constructor(private readonly service: TournamentsService) {}

  @Post('start')
  start(@Body() body: { roomId: string; topicId: string; userId: string }) {
    return this.service.startTournament(body.roomId, body.topicId, body.userId);
  }

  @Post('decision')
  decision(@Body() body: { matchId: string; winnerId: string }) {
    return this.service.decide(body.matchId, body.winnerId);
  }
}
