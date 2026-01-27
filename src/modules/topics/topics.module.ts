import { Module } from '@nestjs/common';
import { TopicsController } from './topics.controller';
import { TopicsService } from './topics.service';
import { TopicsDao } from './dao/topics.dao';

@Module({
  controllers: [TopicsController],
  providers: [TopicsService, TopicsDao],
})
export class TopicsModule {}
