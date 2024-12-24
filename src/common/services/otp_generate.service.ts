import { Injectable } from '@nestjs/common';

@Injectable()
export class OtpGenerateService {
  private readonly charSet =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  generateOtp(length: number): string {
    if (length <= 0) {
      throw new Error('Length must be greater than 0');
    }

    let otp = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = this.getRandomInt(0, this.charSet.length);
      otp += this.charSet[randomIndex];
    }

    return otp;
  }

  private getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }
}
