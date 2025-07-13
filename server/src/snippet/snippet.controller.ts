import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateSnippetDto } from './dto/create-snippet.dto';
import { SnippetService } from './snippet.service';
import { GetUser } from 'src/decorators/get-user.decorator';
import { JwtPayload } from 'src/auth/auth.types';
import { UpdateSnippetDto } from './dto/update-snippet.dto';

@Controller('snippets')
export class SnippetController {
  constructor(private snippetService: SnippetService) {}

  @Post()
  create(@Body() dto: CreateSnippetDto, @GetUser() user: JwtPayload) {
    return this.snippetService.create(dto, user.userId);
  }

  @Patch(':id')
  updateSnippet(
    @Param('id', ParseIntPipe) snippetId: number,
    @Body() dto: UpdateSnippetDto,
    @GetUser() user: JwtPayload,
  ) {
    return this.snippetService.update(snippetId, dto, user.userId);
  }
}
