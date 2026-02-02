import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envValidationSchema } from './config/env.validation';
import { PrismaModule } from './database/prisma/prisma.module';
import { HealthModule } from './modules/health/health.module';
import { AuthModule } from './modules/auth/auth.module';
import { RoomsModule } from './modules/rooms/rooms.module';
import { TopicsModule } from './modules/topics/topics.module';
import { TournamentsModule } from './modules/tournaments/tournaments.module';
import { CandidatesModule } from './modules/candidates/candidates.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envValidationSchema,
    }),
    PrismaModule,
    HealthModule,
    AuthModule,
    RoomsModule,
    TopicsModule,
    TournamentsModule,
    CandidatesModule
  ],
})
export class AppModule {}
