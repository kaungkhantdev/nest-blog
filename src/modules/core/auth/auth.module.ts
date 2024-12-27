import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MailService } from '@/common/services/mail.service';
import { AuthController } from './auth.controller';
import { OtpGenerateService } from '@/common/services/otp_generate.service';
import { UserService } from '../user/user.service';
import { OtpService } from '../otp/otp.service';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../user/repository/user_repo';
import { OtpRepository } from '../otp/repository/otp_repo';
import { PrismaService } from '@/common/services/prisma.service';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    MailService,
    OtpGenerateService,
    UserService,
    OtpService,
    JwtService,
    PrismaService,

    // repository
    UserRepository,
    OtpRepository,
  ],
})
export class AuthModule {}
