import { Module } from '@nestjs/common';
import { FolderService } from './folder.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FolderController } from './folder.controller';

@Module({
  providers: [FolderService],
  imports: [PrismaModule],
  controllers: [FolderController],
})
export class FolderModule {}
