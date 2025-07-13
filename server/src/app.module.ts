import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { HashingModule } from './hashing/hashing.module';
import { UserModule } from './user/user.module';
import { SnippetModule } from './snippet/snippet.module';

@Module({
  imports: [AuthModule, PrismaModule, HashingModule, UserModule, SnippetModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
