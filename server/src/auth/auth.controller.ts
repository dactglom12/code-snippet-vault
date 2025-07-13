import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { LocalAuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(
    @Body() dto: LocalAuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.authService.signup(dto);

    res.cookie('access_token', token.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000,
    });

    return { status: 201, message: 'User created successfully' };
  }

  @Post('signin')
  async signin(
    @Body() dto: LocalAuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.authService.signin(dto);

    res.cookie('access_token', token.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000,
    });

    return { status: 200, message: 'User signed in successfully' };
  }
}
