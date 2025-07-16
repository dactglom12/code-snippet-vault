import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TagService } from 'src/tag/tag.service';
import { CreateSnippetDto } from './dto/create-snippet.dto';
import { UpdateSnippetDto } from './dto/update-snippet.dto';

@Injectable()
export class SnippetService {
  constructor(
    private prisma: PrismaService,
    private tagsService: TagService,
  ) {}

  async create(dto: CreateSnippetDto, userId: number) {
    const tags = await this.tagsService.findOrCreateByLabels(
      dto.tagLabels ?? [],
    );

    return this.prisma.codeSnippet.create({
      data: {
        content: dto.content,
        language: dto.language,
        title: dto.title,
        user: { connect: { id: userId } },
        tags: {
          connect: tags.map((tag) => ({ id: tag.id })),
        },
        folder: dto.folderId ? { connect: { id: dto.folderId } } : {},
      },
    });
  }

  async findAllByUserId(userId: number) {
    return this.prisma.codeSnippet.findMany({
      where: { userId },
      include: { tags: true, folder: true },
    });
  }

  async findAllByFolderId(folderId: number) {
    return this.prisma.codeSnippet.findMany({
      where: { folderId },
      include: { tags: true, folder: true },
    });
  }

  async findById(snippetId: number, userId: number) {
    return this.prisma.codeSnippet.findUnique({
      where: { id: snippetId, userId },
      include: { tags: true, folder: true },
    });
  }

  async update(snippetId: number, dto: UpdateSnippetDto, userId: number) {
    const existing = await this.prisma.codeSnippet.findUnique({
      where: { id: snippetId },
      include: { user: true },
    });

    if (!existing || existing.userId !== userId) {
      throw new ForbiddenException('You do not own this snippet');
    }

    const tags = dto.tagLabels
      ? await this.tagsService.findOrCreateByLabels(dto.tagLabels)
      : undefined;

    return this.prisma.codeSnippet.update({
      where: { id: snippetId },
      data: {
        title: dto.title,
        content: dto.content,
        language: dto.language,
        folder:
          dto.folderId === null
            ? { disconnect: true }
            : dto.folderId
              ? { connect: { id: dto.folderId } }
              : undefined,
        tags: tags ? { set: tags.map((tag) => ({ id: tag.id })) } : undefined,
      },
    });
  }

  async delete(snippetId: number, userId: number) {
    const existing = await this.prisma.codeSnippet.findUnique({
      where: { id: snippetId },
    });

    if (!existing || existing.userId !== userId) {
      throw new ForbiddenException('You do not own this snippet');
    }

    return this.prisma.codeSnippet.delete({ where: { id: snippetId } });
  }
}
