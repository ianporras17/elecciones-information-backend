import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma/prisma.service';

@Injectable()
export class TournamentsDao {
  constructor(private readonly prisma: PrismaService) {}

  createTournament(data: any) {
    return this.prisma.tournament.create({ data });
  }

  createMatch(data: any) {
    return this.prisma.tournamentMatch.create({ data });
  }

  updateMatch(id: string, winner: string) {
    return this.prisma.tournamentMatch.update({
      where: { id },
      data: { winner },
    });
  }
}
