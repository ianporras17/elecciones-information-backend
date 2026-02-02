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
exports.CreateTopicDto = exports.TopicType = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const class_validator_2 = require("class-validator");
var TopicType;
(function (TopicType) {
    TopicType["HEALTH"] = "HEALTH";
    TopicType["WORK"] = "WORK";
    TopicType["SECURITY"] = "SECURITY";
    TopicType["EDUCATION"] = "EDUCATION";
    TopicType["ECONOMY"] = "ECONOMY";
    TopicType["ENVIRONMENT"] = "ENVIRONMENT";
    TopicType["OTHER"] = "OTHER";
})(TopicType || (exports.TopicType = TopicType = {}));
class CreateTopicDto {
    title;
    topicType;
    content;
    order;
    resources;
    candidateId;
    proposalContent;
    static _OPENAPI_METADATA_FACTORY() {
        return { title: { required: true, type: () => String, maxLength: 200 }, topicType: { required: true, enum: require("./create-topic.dto").TopicType }, content: { required: false, type: () => String }, order: { required: false, type: () => Number, minimum: 0 }, resources: { required: false, type: () => [require("./external-resource.dto").ExternalResourceDto] }, candidateId: { required: false, type: () => String, format: "uuid" }, proposalContent: { required: false, type: () => String } };
    }
}
exports.CreateTopicDto = CreateTopicDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], CreateTopicDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_2.IsEnum)(TopicType),
    __metadata("design:type", String)
], CreateTopicDto.prototype, "topicType", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTopicDto.prototype, "content", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateTopicDto.prototype, "order", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateTopicDto.prototype, "resources", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_2.IsUUID)(),
    __metadata("design:type", String)
], CreateTopicDto.prototype, "candidateId", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((o) => o.candidateId !== undefined),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateTopicDto.prototype, "proposalContent", void 0);
//# sourceMappingURL=create-topic.dto.js.map