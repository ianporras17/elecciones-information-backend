"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopicsDao = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../database/prisma/prisma.service");
let TopicsDao = class TopicsDao {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    listByRoom(roomId) {
        return this.prisma.topic.findMany({
            where: { roomId },
            orderBy: { order: 'asc' },
            include: { resources: true, contents: true },
        });
    }
    findById(id) {
        return this.prisma.topic.findUnique({
            where: { id },
            include: { resources: true, contents: true },
        });
    }
    async nextOrder(roomId) {
        const last = await this.prisma.topic.findFirst({
            where: { roomId },
            orderBy: { order: 'desc' },
            select: { order: true },
        });
        return (last?.order ?? 0) + 1;
    }
    create(data) {
        return this.prisma.topic.create({
            data,
            include: { resources: true, contents: true },
        });
    }
    update(id, data) {
        return this.prisma.topic.update({
            where: { id },
            data,
            include: { resources: true, contents: true },
        });
    }
    delete(id) {
        return this.prisma.topic.delete({ where: { id } });
    }
    createResource(data) {
        return this.prisma.externalResource.create({ data });
    }
    updateResource(id, data) {
        return this.prisma.externalResource.update({ where: { id }, data });
    }
    deleteResource(id) {
        return this.prisma.externalResource.delete({ where: { id } });
    }
    upsertTopicContent(topicId, participantId, content) {
        return this.prisma.topicContent.upsert({
            where: { topicId_participantId: { topicId, participantId } },
            update: { content },
            create: { topicId, participantId, content },
        });
    }
};
exports.TopicsDao = TopicsDao;
exports.TopicsDao = TopicsDao = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TopicsDao);
//# sourceMappingURL=topics.dao.js.map