import { IsEmail, IsString } from 'class-validator';

export class AuthOtpRequestDto {
  @IsEmail()
  email: string;
}

export class AuthVerifyOtpRequestDto {
  @IsEmail()
  email: string;

  @IsString()
  otp: string;
}
