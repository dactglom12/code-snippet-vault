import { IsString, IsOptional, IsArray, IsInt } from 'class-validator';

export class UpdateSnippetDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  content: string;

  @IsString()
  @IsOptional()
  language: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tagLabels?: string[];

  @IsInt()
  @IsOptional()
  folderId?: number;
}
