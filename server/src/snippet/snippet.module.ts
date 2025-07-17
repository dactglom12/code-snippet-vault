import { Module } from '@nestjs/common';
import { SnippetService } from './snippet.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SnippetController } from './snippet.controller';
import { TagModule } from 'src/tag/tag.module';

@Module({
  providers: [SnippetService],
  imports: [PrismaModule, TagModule],
  controllers: [SnippetController],
  exports: [SnippetService],
})
export class SnippetModule {}
