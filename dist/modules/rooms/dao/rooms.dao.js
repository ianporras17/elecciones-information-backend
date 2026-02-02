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
exports.RoomsDao = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../database/prisma/prisma.service");
let RoomsDao = class RoomsDao {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    findByAccessCode(code) {
        return this.prisma.room.findUnique({ where: { accessCode: code } });
    }
    findById(id) {
        return this.prisma.room.findUnique({ where: { id } });
    }
    findAll() {
        return this.prisma.room.findMany({ orderBy: { createdAt: 'desc' } });
    }
    createWithCreator(data, creatorId) {
        return this.prisma.room.create({
            data: {
                ...data,
                members: {
                    create: {
                        user: { connect: { id: creatorId } },
                        role: 'ADMIN',
                    },
                },
            },
        });
    }
    listRoomsForUser(userId) {
        return this.prisma.room.findMany({
            where: {
                members: { some: { userId } },
            },
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                title: true,
                description: true,
                accessCode: true,
                isActive: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }
    upsertMember(roomId, userId) {
        return this.prisma.roomMember.upsert({
            where: { roomId_userId: { roomId, userId } },
            update: {},
            create: { roomId, userId, role: 'MEMBER' },
        });
    }
    listMembers(roomId) {
        return this.prisma.roomMember.findMany({
            where: { roomId },
            include: { user: { select: { id: true, name: true, email: true } } },
            orderBy: { joinedAt: 'asc' },
        });
    }
    update(id, data) {
        return this.prisma.room.update({ where: { id }, data });
    }
};
exports.RoomsDao = RoomsDao;
exports.RoomsDao = RoomsDao = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RoomsDao);
//# sourceMappingURL=rooms.dao.js.map