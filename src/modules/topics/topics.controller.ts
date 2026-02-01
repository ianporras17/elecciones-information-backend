import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { CreateTopicDto } from './dtos/create-topic.dto';
import { UpdateTopicDto } from './dtos/update-topic.dto';
import { ExternalResourceDto } from './dtos/external-resource.dto';
import { UpsertTopicContentDto } from './dtos/upsert-topic-content.dto';

@Controller()
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  // Listar / crear topics por sala
  @Get('rooms/:roomId/topics')
  listByRoom(@Param('roomId') roomId: string) {
    return this.topicsService.listByRoom(roomId);
  }

  @Post('rooms/:roomId/topics')
  create(@Param('roomId') roomId: string, @Body() dto: CreateTopicDto) {
    return this.topicsService.create(roomId, dto);
  }

  // CRUD topic
  @Get('topics/:id')
  get(@Param('id') id: string) {
    return this.topicsService.get(id);
  }

  @Put('topics/:id')
  update(@Param('id') id: string, @Body() dto: UpdateTopicDto) {
    return this.topicsService.update(id, dto);
  }

  @Delete('topics/:id')
  delete(@Param('id') id: string) {
    return this.topicsService.delete(id);
  }

  // External resources
  @Post('topics/:topicId/resources')
  addResource(@Param('topicId') topicId: string, @Body() dto: ExternalResourceDto) {
    return this.topicsService.addResource(topicId, dto);
  }

  @Put('external-resources/:id')
  updateResource(@Param('id') id: string, @Body() dto: Partial<ExternalResourceDto>) {
    return this.topicsService.updateResource(id, dto);
  }

  @Delete('external-resources/:id')
  deleteResource(@Param('id') id: string) {
    return this.topicsService.deleteResource(id);
  }

  // TopicContent (por participante)
  @Put('topics/:topicId/contents')
  upsertContent(@Param('topicId') topicId: string, @Body() dto: UpsertTopicContentDto) {
    return this.topicsService.upsertContent(topicId, dto);
  }
}
