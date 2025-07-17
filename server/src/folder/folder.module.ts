import { Module } from '@nestjs/common';
import { FolderService } from './folder.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FolderController } from './folder.controller';
import { SnippetModule } from 'src/snippet/snippet.module';

@Module({
  providers: [FolderService],
  imports: [PrismaModule, SnippetModule],
  controllers: [FolderController],
})
export class FolderModule {}
