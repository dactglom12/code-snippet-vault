import { UnauthorizedException, Injectable } from '@nestjs/common';
import { HashingService } from 'src/hashing/hashing.service';
import { JwtService } from '@nestjs/jwt';
import { LocalAuthDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private hasher: HashingService,
    private jwt: JwtService,
    private userService: UserService,
  ) {}

  async signup(dto: LocalAuthDto) {
    try {
      const hash = await this.hasher.hash(dto.password);
      const user = await this.userService.create({
        email: dto.email,
        password: hash,
      });
      return this.signToken(user.id, user.email);
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException('Incorrect signup data');
    }
  }

  async signin(dto: LocalAuthDto) {
    try {
      const user = await this.userService.findOneByEmail(dto.email);

      if (!user) {
        throw new Error('Invalid credentials');
      }

      const isValidHash = await this.hasher.compare(
        dto.password,
        user.password,
      );

      if (!isValidHash) {
        throw new Error('Invalid credentials');
      }

      return this.signToken(user.id, user.email);
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException('Incorrect signin data');
    }
  }

  private signToken(userId: number, email: string): { accessToken: string } {
    const token = this.jwt.sign(
      { userId, email },
      {
        expiresIn: '15m',
        secret: process.env.JWT_SECRET,
      },
    );
    return { accessToken: token };
  }
}
