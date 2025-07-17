import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateFolderDto {
  @IsString()
  name: string;

  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  snippetIds?: number[];
}
