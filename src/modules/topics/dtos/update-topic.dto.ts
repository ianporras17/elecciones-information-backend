import { IsInt, IsOptional, IsString, MaxLength, Min, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { TopicType } from '@prisma/client';

export class UpdateTopicDto {
  @IsOptional()
  @IsString()
  @MaxLength(200)
  title?: string;

  @IsOptional()
  @IsEnum(TopicType)
  topicType?: TopicType; 

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  order?: number;
}
