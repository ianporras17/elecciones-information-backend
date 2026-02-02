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
exports.CandidatesDao = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../database/prisma/prisma.service");
let CandidatesDao = class CandidatesDao {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    getMembership(roomId, userId) {
        return this.prisma.roomMember.findUnique({
            where: { roomId_userId: { roomId, userId } },
            select: { role: true },
        });
    }
    list(roomId) {
        return this.prisma.candidate.findMany({
            where: { roomId },
            orderBy: { createdAt: 'asc' },
            select: { id: true, name: true, roomId: true },
        });
    }
    create(roomId, name) {
        return this.prisma.candidate.create({
            data: { roomId, name },
            select: { id: true, name: true, roomId: true },
        });
    }
};
exports.CandidatesDao = CandidatesDao;
exports.CandidatesDao = CandidatesDao = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CandidatesDao);
//# sourceMappingURL=candidates.dao.js.map