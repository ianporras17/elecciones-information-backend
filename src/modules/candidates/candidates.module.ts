import { Module } from '@nestjs/common';
import { CandidatesController } from './candidates.controller';
import { CandidatesService } from './candidates.service';
import { CandidatesDao } from './dao/candidates.dao';

@Module({
  controllers: [CandidatesController],
  providers: [CandidatesService, CandidatesDao],
})
export class CandidatesModule {}