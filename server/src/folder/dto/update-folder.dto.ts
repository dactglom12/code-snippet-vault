import { IsString, IsOptional } from 'class-validator';

export class CreateFolderDto {
  @IsString()
  @IsOptional()
  name: string;
}
