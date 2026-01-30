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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma/prisma.service");
const role_enum_1 = require("./role.enum");
const password_util_1 = require("../../utils/password.util");
let AuthService = class AuthService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async registerAdmin(dto) {
        await this.ensureUserDoesNotExist(dto.email, dto.username);
        const passwordHash = await password_util_1.PasswordUtil.hash(dto.password);
        await this.prisma.user.create({
            data: {
                name: dto.username,
                email: dto.email,
                passwordHash,
                role: role_enum_1.RoleEnum.ADMIN,
            },
        });
        return { message: 'Administrador registrado correctamente' };
    }
    async registerUser(dto) {
        await this.ensureUserDoesNotExist(dto.email, dto.name);
        const passwordHash = await password_util_1.PasswordUtil.hash(dto.password);
        await this.prisma.user.create({
            data: {
                name: dto.name,
                email: dto.email,
                passwordHash,
                role: role_enum_1.RoleEnum.USER,
            },
        });
        return { message: 'Usuario registrado correctamente' };
    }
    async loginAdmin(dto) {
        const user = await this.validateUser(dto);
        if (user.role !== role_enum_1.RoleEnum.ADMIN) {
            throw new common_1.UnauthorizedException('Acceso no autorizado');
        }
        return this.buildLoginResponse(user);
    }
    async loginUser(dto) {
        const user = await this.validateUser(dto);
        if (user.role !== role_enum_1.RoleEnum.USER) {
            throw new common_1.UnauthorizedException('Acceso no autorizado');
        }
        return this.buildLoginResponse(user);
    }
    async ensureUserDoesNotExist(email, name) {
        const existingUser = await this.prisma.user.findFirst({
            where: {
                OR: [{ email }, { name }],
            },
        });
        if (existingUser) {
            throw new common_1.ConflictException('El correo o nombre de usuario ya está registrado');
        }
    }
    async validateUser(dto) {
        const user = await this.prisma.user.findFirst({
            where: {
                OR: [{ email: dto.identifier }, { name: dto.identifier }],
            },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        }
        const passwordValid = await password_util_1.PasswordUtil.compare(dto.password, user.passwordHash);
        if (!passwordValid) {
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        }
        return user;
    }
    buildLoginResponse(user) {
        return {
            message: 'Login exitoso',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AuthService);
//# sourceMappingURL=auth.service.js.map