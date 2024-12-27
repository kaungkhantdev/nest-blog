import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/services/prisma.service'; // Path to PrismaService
import { Otp } from '@prisma/client'; // Prisma Otp type

@Injectable()
export class OtpRepository {
  constructor(private readonly prisma: PrismaService) {}

  // Create OTP
  async createOtp(data: Otp): Promise<Otp> {
    try {
      return await this.prisma.otp.create({
        data: {
          email: data.email,
          otp: data.otp,
          expiresAt: data.expiresAt,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  // Get OTP by Email
  async getOtpByEmail(email: string): Promise<Otp | null> {
    try {
      return await this.prisma.otp.findUnique({
        where: { email },
      });
    } catch (error) {
      throw error;
    }
  }

  // Update OTP by Email
  async updateOtpByEmail(
    email: string,
    otp: string,
    expireAt: number,
  ): Promise<Otp | null> {
    try {
      return await this.prisma.otp.update({
        where: { email },
        data: {
          otp,
          expiresAt: expireAt,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
