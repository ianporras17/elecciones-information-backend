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
exports.TournamentsService = void 0;
const common_1 = require("@nestjs/common");
const tournaments_dao_1 = require("./dao/tournaments.dao");
let TournamentsService = class TournamentsService {
    dao;
    constructor(dao) {
        this.dao = dao;
    }
    startTournament(roomId, topicId, userId) {
        return this.dao.createTournament({
            roomId,
            topicId,
            userId,
        });
    }
    decide(matchId, winnerId) {
        return this.dao.updateMatch(matchId, winnerId);
    }
};
exports.TournamentsService = TournamentsService;
exports.TournamentsService = TournamentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tournaments_dao_1.TournamentsDao])
], TournamentsService);
//# sourceMappingURL=tournaments.service.js.map