import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from 'generated/prisma';

@Injectable()
export class SnippetService {
  constructor(private prisma: PrismaService) {}

  async create(dto: Prisma.CodeSnippetCreateInput) {
    return this.prisma.codeSnippet.create({
      data: dto,
    });
  }

  async findAllByUserId(userId: number) {
    return this.prisma.codeSnippet.findMany({ where: { userId } });
  }

  async findAllByFolderId(folderId: number) {
    return this.prisma.codeSnippet.findMany({ where: { folderId } });
  }

  async findById(snippetId: number, userId: number) {
    return this.prisma.codeSnippet.findUnique({
      where: { id: snippetId, userId },
    });
  }

  async update(
    snippetId: number,
    dto: Prisma.CodeSnippetUpdateInput,
    userId: number,
  ) {
    return this.prisma.codeSnippet.update({
      data: dto,
      where: { id: snippetId, userId },
    });
  }

  async delete(snippetId: number) {
    return this.prisma.codeSnippet.delete({ where: { id: snippetId } });
  }
}
