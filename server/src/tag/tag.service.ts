import { Injectable } from '@nestjs/common';
import { Tag } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TagService {
  constructor(private prisma: PrismaService) {}

  async findOrCreateByLabels(labels: string[]) {
    const tags: Tag[] = [];

    for (const label of labels) {
      const existingTag = await this.prisma.tag.findUnique({
        where: { label },
      });

      if (existingTag) {
        tags.push(existingTag);
      } else {
        const created = await this.prisma.tag.create({ data: { label } });
        tags.push(created);
      }
    }

    return tags;
  }
}
