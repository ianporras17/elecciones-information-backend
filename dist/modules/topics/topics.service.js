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
exports.TopicsService = void 0;
const common_1 = require("@nestjs/common");
const topics_dao_1 = require("./dao/topics.dao");
let TopicsService = class TopicsService {
    topicsDao;
    constructor(topicsDao) {
        this.topicsDao = topicsDao;
    }
    listByRoom(roomId) {
        return this.topicsDao.listByRoom(roomId);
    }
    async get(id) {
        const topic = await this.topicsDao.findById(id);
        if (!topic)
            throw new common_1.NotFoundException('Topic no existe');
        return topic;
    }
    async create(roomId, dto) {
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
    update(id, dto) {
        return this.topicsDao.update(id, {
            ...(dto.title !== undefined ? { title: dto.title } : {}),
            ...(dto.content !== undefined ? { content: dto.content } : {}),
            ...(dto.order !== undefined ? { order: dto.order } : {}),
        });
    }
    delete(id) {
        return this.topicsDao.delete(id);
    }
    addResource(topicId, dto) {
        return this.topicsDao.createResource({
            topic: { connect: { id: topicId } },
            type: dto.type,
            title: dto.title,
            url: dto.url,
            description: dto.description ?? null,
            order: dto.order ?? 0,
        });
    }
    updateResource(resourceId, dto) {
        return this.topicsDao.updateResource(resourceId, {
            ...(dto.type !== undefined ? { type: dto.type } : {}),
            ...(dto.title !== undefined ? { title: dto.title } : {}),
            ...(dto.url !== undefined ? { url: dto.url } : {}),
            ...(dto.description !== undefined ? { description: dto.description } : {}),
            ...(dto.order !== undefined ? { order: dto.order } : {}),
        });
    }
    deleteResource(resourceId) {
        return this.topicsDao.deleteResource(resourceId);
    }
    upsertContent(topicId, dto) {
        return this.topicsDao.upsertTopicContent(topicId, dto.participantId, dto.content);
    }
};
exports.TopicsService = TopicsService;
exports.TopicsService = TopicsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [topics_dao_1.TopicsDao])
], TopicsService);
//# sourceMappingURL=topics.service.js.map