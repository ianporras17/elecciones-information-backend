import { IsNotEmpty, IsString } from 'class-validator';

export class UpsertTopicContentDto {
  @IsString()
  @IsNotEmpty()
  participantId: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}
