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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopicsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const topics_service_1 = require("./topics.service");
const create_topic_dto_1 = require("./dtos/create-topic.dto");
const update_topic_dto_1 = require("./dtos/update-topic.dto");
const external_resource_dto_1 = require("./dtos/external-resource.dto");
const upsert_topic_content_dto_1 = require("./dtos/upsert-topic-content.dto");
const common_2 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const upsert_proposal_dto_1 = require("./dtos/upsert-proposal.dto");
let TopicsController = class TopicsController {
    topicsService;
    constructor(topicsService) {
        this.topicsService = topicsService;
    }
    listByRoom(roomId) {
        return this.topicsService.listByRoom(roomId);
    }
    create(roomId, dto) {
        return this.topicsService.create(roomId, dto);
    }
    get(id) {
        return this.topicsService.get(id);
    }
    update(id, dto) {
        return this.topicsService.update(id, dto);
    }
    delete(id) {
        return this.topicsService.delete(id);
    }
    addResource(topicId, dto) {
        return this.topicsService.addResource(topicId, dto);
    }
    updateResource(id, dto) {
        return this.topicsService.updateResource(id, dto);
    }
    upsertProposal(topicId, dto) {
        return this.topicsService.upsertProposal(topicId, dto);
    }
    deleteResource(id) {
        return this.topicsService.deleteResource(id);
    }
    upsertContent(topicId, dto) {
        return this.topicsService.upsertContent(topicId, dto);
    }
};
exports.TopicsController = TopicsController;
__decorate([
    (0, common_1.Get)('rooms/:roomId/topics'),
    openapi.ApiResponse({ status: 200, type: [Object] }),
    __param(0, (0, common_1.Param)('roomId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TopicsController.prototype, "listByRoom", null);
__decorate([
    (0, common_1.Post)('rooms/:roomId/topics'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Param)('roomId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_topic_dto_1.CreateTopicDto]),
    __metadata("design:returntype", void 0)
], TopicsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('topics/:id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TopicsController.prototype, "get", null);
__decorate([
    (0, common_1.Put)('topics/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_topic_dto_1.UpdateTopicDto]),
    __metadata("design:returntype", void 0)
], TopicsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('topics/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TopicsController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)('topics/:topicId/resources'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Param)('topicId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, external_resource_dto_1.ExternalResourceDto]),
    __metadata("design:returntype", void 0)
], TopicsController.prototype, "addResource", null);
__decorate([
    (0, common_1.Put)('external-resources/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TopicsController.prototype, "updateResource", null);
__decorate([
    (0, common_1.Put)('topics/:topicId/proposals'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('topicId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, upsert_proposal_dto_1.UpsertProposalDto]),
    __metadata("design:returntype", void 0)
], TopicsController.prototype, "upsertProposal", null);
__decorate([
    (0, common_1.Delete)('external-resources/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TopicsController.prototype, "deleteResource", null);
__decorate([
    (0, common_1.Put)('topics/:topicId/contents'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('topicId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, upsert_topic_content_dto_1.UpsertTopicContentDto]),
    __metadata("design:returntype", void 0)
], TopicsController.prototype, "upsertContent", null);
exports.TopicsController = TopicsController = __decorate([
    (0, common_2.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [topics_service_1.TopicsService])
], TopicsController);
//# sourceMappingURL=topics.controller.js.map