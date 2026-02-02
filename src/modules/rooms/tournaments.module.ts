import { Module } from '@nestjs/common';
import { TournamentsController } from './tournaments.controller';
import { TournamentsService } from './tournaments.service';
import { TournamentsDao } from './dao/tournaments.dao';

@Module({
  controllers: [TournamentsController],
  providers: [TournamentsService, TournamentsDao],
})
export class TournamentsModule {}
