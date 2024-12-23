import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from './repository/user_repo';
import { UserController } from './user.controller';
import { PrismaService } from '@/common/services/prisma.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, UserRepository],
})
export class UserModule {}
