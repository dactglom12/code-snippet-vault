import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          if (!req.cookies) {
            return null;
          }

          return req.cookies['access_token'] as string;
        },
      ]),
      secretOrKey: process.env.JWT_SECRET,
      secretOrKeyProvider: (req: Request) => req,
    });
  }

  validate(payload: any): unknown {
    console.log('Validated payload');
    console.log(payload);

    return payload;
  }
}
