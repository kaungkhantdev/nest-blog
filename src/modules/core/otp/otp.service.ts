import { Injectable } from '@nestjs/common';
import { OtpRepository } from './repository/otp_repo'; // Adjust the path as necessary
import { Otp } from '@prisma/client'; // Prisma-generated Otp type

@Injectable()
export class OtpService {
  constructor(private readonly otpRepository: OtpRepository) {}

  // Create OTP
  async createOtp(data: any): Promise<Otp> {
    try {
      return await this.otpRepository.createOtp(data);
    } catch (error) {
      throw new Error(`Error creating OTP: ${error.message}`);
    }
  }

  // Get OTP by Email
  async getOtpByEmail(email: string): Promise<Otp | null> {
    try {
      return await this.otpRepository.getOtpByEmail(email);
    } catch (error) {
      throw new Error(
        `Error fetching OTP for email ${email}: ${error.message}`,
      );
    }
  }

  // Update OTP by Email
  async updateOtpByEmail(
    email: string,
    otp: string,
    expireAt: number,
  ): Promise<Otp | null> {
    try {
      return await this.otpRepository.updateOtpByEmail(email, otp, expireAt);
    } catch (error) {
      throw new Error(
        `Error updating OTP for email ${email}: ${error.message}`,
      );
    }
  }
}
