import { Body, Controller, Get, Post } from '@nestjs/common';
import { FolderService } from './folder.service';
import { CreateFolderDto } from './dto/create-folder.dto';
import { GetUser } from 'src/decorators/get-user.decorator';
import { JwtPayload } from 'src/auth/auth.types';

@Controller('folders')
export class FolderController {
  constructor(private folderService: FolderService) {}

  @Post()
  async create(@Body() dto: CreateFolderDto, @GetUser() user: JwtPayload) {
    const createdFolder = await this.folderService.create(dto, user.userId);

    return { success: true, folder: createdFolder };
  }

  @Get()
  async findAllByUserId(@GetUser() user: JwtPayload) {
    return this.folderService.findAllByUserId(user.userId);
  }
}
