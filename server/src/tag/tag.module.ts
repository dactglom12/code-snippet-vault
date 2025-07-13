import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [TagService],
  imports: [PrismaModule],
  exports: [TagService],
})
export class TagModule {}
