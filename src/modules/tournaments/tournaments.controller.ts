import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TournamentsService } from './tournaments.service';

@UseGuards(AuthGuard('jwt'))
@Controller('tournaments')
export class TournamentsController {
  constructor(private readonly service: TournamentsService) {}

  @Post('start')
  start(@Body() body: { roomId: string; topicId: string }, @Req() req: any) {
    return this.service.startTournament(body.roomId, body.topicId, req.user.id);
  }

  @Post('decision')
  decision(@Body() body: { matchId: string; winnerId: string }, @Req() req: any) {
    return this.service.decide(body.matchId, body.winnerId, req.user.id);
  }

  @Get(':tournamentId/next')
  next(@Param('tournamentId') tournamentId: string, @Req() req: any) {
    return this.service.getNextMatch(tournamentId, req.user.id);
  }
}
