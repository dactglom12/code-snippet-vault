import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFolderDto } from './dto/create-folder.dto';

@Injectable()
export class FolderService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateFolderDto, userId: number) {
    return this.prisma.folder.create({
      data: {
        name: dto.name,
        user: { connect: { id: userId } },
      },
    });
  }

  async findAllByUserId(userId: number) {
    return this.prisma.folder.findMany({
      where: { userId },
      include: { snippets: true },
    });
  }
}
