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
exports.CandidatesService = void 0;
const common_1 = require("@nestjs/common");
const candidates_dao_1 = require("./dao/candidates.dao");
let CandidatesService = class CandidatesService {
    dao;
    constructor(dao) {
        this.dao = dao;
    }
    list(roomId) {
        return this.dao.list(roomId);
    }
    async create(roomId, userId, name) {
        const member = await this.dao.getMembership(roomId, userId);
        if (!member || member.role !== 'ADMIN') {
            throw new common_1.ForbiddenException('Solo admin puede crear candidatos');
        }
        return this.dao.create(roomId, name.trim());
    }
};
exports.CandidatesService = CandidatesService;
exports.CandidatesService = CandidatesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [candidates_dao_1.CandidatesDao])
], CandidatesService);
//# sourceMappingURL=candidates.service.js.map