import { Injectable } from '@nestjs/common';
import { HashingService } from './hashing.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptHashingService implements HashingService {
  private readonly saltRounds = 12;

  compare(data: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(data, hashed);
  }

  hash(data: string): Promise<string> {
    return bcrypt.hash(data, this.saltRounds);
  }
}
