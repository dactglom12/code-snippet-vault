import {
  IsString,
  IsOptional,
  IsArray,
  IsNotEmpty,
  IsInt,
} from 'class-validator';

export class CreateSnippetDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  language: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tagLabels?: string[];

  @IsInt()
  @IsOptional()
  folderId?: number;
}
