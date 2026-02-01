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
exports.RoomsService = void 0;
const common_1 = require("@nestjs/common");
const rooms_dao_1 = require("./dao/rooms.dao");
const create_room_dto_1 = require("./dtos/create-room.dto");
let RoomsService = class RoomsService {
    roomsDao;
    constructor(roomsDao) {
        this.roomsDao = roomsDao;
    }
    generateAccessCode() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        return Array.from({ length: 6 })
            .map(() => chars[Math.floor(Math.random() * chars.length)])
            .join('');
    }
    findAll() {
        return this.roomsDao.findAll();
    }
    async findById(id) {
        const room = await this.roomsDao.findById(id);
        if (!room)
            throw new common_1.NotFoundException('Sala no existe');
        return room;
    }
    async create(dto) {
        let code = '';
        while (true) {
            code = this.generateAccessCode();
            const found = await this.roomsDao.findByAccessCode(code);
            if (!found)
                break;
        }
        return this.roomsDao.create({
            title: dto.name,
            accessCode: code,
            isActive: dto.status === create_room_dto_1.RoomStatus.ACTIVE,
        });
    }
    update(id, dto) {
        return this.roomsDao.update(id, {
            ...(dto.name !== undefined ? { title: dto.name } : {}),
            ...(dto.status !== undefined ? { isActive: dto.status === create_room_dto_1.RoomStatus.ACTIVE } : {}),
        });
    }
    async join(accessCode) {
        const room = await this.roomsDao.findByAccessCode(accessCode);
        if (!room)
            throw new common_1.NotFoundException('Código inválido');
        return room;
    }
};
exports.RoomsService = RoomsService;
exports.RoomsService = RoomsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [rooms_dao_1.RoomsDao])
], RoomsService);
//# sourceMappingURL=rooms.service.js.map