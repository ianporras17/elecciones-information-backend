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
exports.CandidatesController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const candidates_service_1 = require("./candidates.service");
let CandidatesController = class CandidatesController {
    service;
    constructor(service) {
        this.service = service;
    }
    list(roomId) {
        return this.service.list(roomId);
    }
    create(roomId, body, req) {
        return this.service.create(roomId, req.user.id, body.name);
    }
};
exports.CandidatesController = CandidatesController;
__decorate([
    (0, common_1.Get)('rooms/:roomId/candidates'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('roomId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CandidatesController.prototype, "list", null);
__decorate([
    (0, common_1.Post)('rooms/:roomId/candidates'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Param)('roomId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], CandidatesController.prototype, "create", null);
exports.CandidatesController = CandidatesController = __decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [candidates_service_1.CandidatesService])
], CandidatesController);
//# sourceMappingURL=candidates.controller.js.map