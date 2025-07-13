import {
  createParamDecorator,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtPayload } from 'src/auth/auth.types';

export const GetUser = createParamDecorator(
  (field: keyof JwtPayload | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<Request>();

    if (!request.user) {
      throw new NotFoundException('User not attached to request');
    }

    const typedUser = request.user as JwtPayload;

    if (!field) {
      return typedUser;
    }

    return typedUser[field];
  },
);
