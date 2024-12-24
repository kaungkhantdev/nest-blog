import { PrismaService } from '@/common/services/prisma.service';
import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';

@Module({
  controllers: [],
  providers: [PrismaService, OtpService],
  exports: [OtpService],
})
export class OtpModule {}
