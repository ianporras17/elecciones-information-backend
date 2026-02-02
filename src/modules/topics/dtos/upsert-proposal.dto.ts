import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpsertProposalDto {
  @IsUUID()
  candidateId: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}
