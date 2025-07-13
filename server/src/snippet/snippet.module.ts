import { Module } from '@nestjs/common';
import { SnippetService } from './snippet.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SnippetController } from './snippet.controller';

@Module({
  providers: [SnippetService],
  imports: [PrismaModule],
  controllers: [SnippetController],
})
export class SnippetModule {}
