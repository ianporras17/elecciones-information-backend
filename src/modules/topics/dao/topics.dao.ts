import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TopicsDao {
  constructor(private readonly prisma: PrismaService) {}

  listByRoom(roomId: string) {
    return this.prisma.topic.findMany({
      where: { roomId },
      orderBy: { order: 'asc' },
      include: { resources: true, contents: true },
    });
  }

  findById(id: string) {
    return this.prisma.topic.findUnique({
      where: { id },
      include: { resources: true, contents: true },
    });
  }

  async nextOrder(roomId: string): Promise<number> {
    const last = await this.prisma.topic.findFirst({
      where: { roomId },
      orderBy: { order: 'desc' },
      select: { order: true },
    });
    return (last?.order ?? 0) + 1;
  }

  create(data: Prisma.TopicCreateInput) {
    return this.prisma.topic.create({
      data,
      include: { resources: true, contents: true },
    });
  }

  update(id: string, data: Prisma.TopicUpdateInput) {
    return this.prisma.topic.update({
      where: { id },
      data,
      include: { resources: true, contents: true },
    });
  }

  delete(id: string) {
    return this.prisma.topic.delete({ where: { id } });
  }

  createResource(data: Prisma.ExternalResourceCreateInput) {
    return this.prisma.externalResource.create({ data });
  }

  updateResource(id: string, data: Prisma.ExternalResourceUpdateInput) {
    return this.prisma.externalResource.update({ where: { id }, data });
  }

  deleteResource(id: string) {
    return this.prisma.externalResource.delete({ where: { id } });
  }

  upsertTopicContent(topicId: string, participantId: string, content: string) {
    return this.prisma.topicContent.upsert({
      where: { topicId_participantId: { topicId, participantId } },
      update: { content },
      create: { topicId, participantId, content },
    });
  }
}
