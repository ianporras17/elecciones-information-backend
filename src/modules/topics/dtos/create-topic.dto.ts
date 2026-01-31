import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ExternalResourceDto } from './external-resource.dto';

export class CreateTopicDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  title: string;

  @IsOptional()
  @IsString()
  content?: string;

  // opcional: si no lo mandas, lo calculamos (último order + 1)
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  order?: number;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ExternalResourceDto)
  resources?: ExternalResourceDto[];
}
