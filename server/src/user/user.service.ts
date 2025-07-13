import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from 'generated/prisma';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(entity: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data: entity });
  }

  async findOneByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async deleteById(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
