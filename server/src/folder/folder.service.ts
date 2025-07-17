import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFolderDto } from './dto/create-folder.dto';
import { SnippetService } from 'src/snippet/snippet.service';

@Injectable()
export class FolderService {
  constructor(
    private prisma: PrismaService,
    private snippetService: SnippetService,
  ) {}

  async create(dto: CreateFolderDto, userId: number) {
    const createdFolder = await this.prisma.folder.create({
      data: {
        name: dto.name,
        user: { connect: { id: userId } },
      },
    });

    if (dto.snippetIds) {
      await this.snippetService.assignSnippetsToFolder(
        dto.snippetIds,
        createdFolder.id,
        userId,
      );
    }

    return createdFolder;
  }

  async findAllByUserId(userId: number) {
    return this.prisma.folder.findMany({
      where: { userId },
      include: { snippets: true },
    });
  }
}
