import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { HashingModule } from './hashing/hashing.module';
import { UserModule } from './user/user.module';
import { SnippetModule } from './snippet/snippet.module';
import { FolderModule } from './folder/folder.module';
import { TagModule } from './tag/tag.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './guards/jwt.guard';
import { JwtStrategy } from './auth/strategies/jwt.strategy';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    HashingModule,
    UserModule,
    SnippetModule,
    FolderModule,
    TagModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: JwtGuard },
    JwtStrategy,
  ],
})
export class AppModule {}
