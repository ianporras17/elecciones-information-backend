import { Injectable, NotFoundException } from '@nestjs/common';
import { TopicsDao } from './dao/topics.dao';
import { CreateTopicDto } from './dtos/create-topic.dto';
import { UpdateTopicDto } from './dtos/update-topic.dto';
import { ExternalResourceDto } from './dtos/external-resource.dto';
import { UpsertTopicContentDto } from './dtos/upsert-topic-content.dto';

@Injectable()
export class TopicsService {
  constructor(private readonly topicsDao: TopicsDao) {}

  listByRoom(roomId: string) {
    return this.topicsDao.listByRoom(roomId);
  }

  async get(id: string) {
    const topic = await this.topicsDao.findById(id);
    if (!topic) throw new NotFoundException('Topic no existe');
    return topic;
  }

  async create(roomId: string, dto: CreateTopicDto) {
    const order = dto.order ?? (await this.topicsDao.nextOrder(roomId));

    return this.topicsDao.create({
      room: { connect: { id: roomId } },
      title: dto.title,
      content: dto.content ?? null,
      order,
      resources: dto.resources?.length
        ? {
            create: dto.resources.map((r) => ({
              type: r.type,
              title: r.title,
              url: r.url,
              description: r.description ?? null,
              order: r.order ?? 0,
            })),
          }
        : undefined,
    });
  }

  update(id: string, dto: UpdateTopicDto) {
    return this.topicsDao.update(id, {
      ...(dto.title !== undefined ? { title: dto.title } : {}),
      ...(dto.content !== undefined ? { content: dto.content } : {}),
      ...(dto.order !== undefined ? { order: dto.order } : {}),
    });
  }

  delete(id: string) {
    return this.topicsDao.delete(id);
  }

  addResource(topicId: string, dto: ExternalResourceDto) {
    return this.topicsDao.createResource({
      topic: { connect: { id: topicId } },
      type: dto.type,
      title: dto.title,
      url: dto.url,
      description: dto.description ?? null,
      order: dto.order ?? 0,
    });
  }

  updateResource(resourceId: string, dto: Partial<ExternalResourceDto>) {
    return this.topicsDao.updateResource(resourceId, {
      ...(dto.type !== undefined ? { type: dto.type } : {}),
      ...(dto.title !== undefined ? { title: dto.title } : {}),
      ...(dto.url !== undefined ? { url: dto.url } : {}),
      ...(dto.description !== undefined ? { description: dto.description } : {}),
      ...(dto.order !== undefined ? { order: dto.order } : {}),
    });
  }

  deleteResource(resourceId: string) {
    return this.topicsDao.deleteResource(resourceId);
  }

  upsertContent(topicId: string, dto: UpsertTopicContentDto) {
    return this.topicsDao.upsertTopicContent(topicId, dto.participantId, dto.content);
  }
}
