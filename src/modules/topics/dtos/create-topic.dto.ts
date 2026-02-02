import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min, ValidateIf } from 'class-validator';
import { Type } from 'class-transformer';
import { IsEnum, IsUUID } from 'class-validator';
import { ExternalResourceDto } from './external-resource.dto';

export enum TopicType {
  HEALTH = 'HEALTH',
  WORK = 'WORK',
  SECURITY = 'SECURITY',
  EDUCATION = 'EDUCATION',
  ECONOMY = 'ECONOMY',
  ENVIRONMENT = 'ENVIRONMENT',
  OTHER = 'OTHER',
}

export class CreateTopicDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  title: string;

  @IsEnum(TopicType)
  topicType: TopicType;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  order?: number;

  @IsOptional()
  resources?: ExternalResourceDto[];

  @IsOptional()
  @IsUUID()
  candidateId?: string;

  @ValidateIf((o) => o.candidateId !== undefined)
  @IsString()
  @IsNotEmpty()
  proposalContent?: string;
}