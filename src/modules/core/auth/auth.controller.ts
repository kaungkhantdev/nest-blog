import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthSignUpDto } from './dto/auth_signup.dto';
import { AuthOtpRequestDto, AuthVerifyOtpRequestDto } from './dto/auth_otp.dto';
import { VerifyRefreshTokenRequestDto } from './dto/verify_refresh_token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Get OTP via Email
  @Post('get-otp')
  async getOtpViaEmail(@Body() input: AuthOtpRequestDto) {
    try {
      const data = await this.authService.getOtpViaEmail(input.email);
      return { message: 'Success', data };
    } catch (error) {
      throw error;
    }
  }

  // Verify OTP via Email
  @Post('verify-otp')
  async verifyOtpViaEmail(@Body() input: AuthVerifyOtpRequestDto) {
    try {
      const data = await this.authService.verifyOtpViaEmail({
        otp: input.otp,
        email: input.email,
      });
      return { message: 'Success', data };
    } catch (error) {
      throw error;
    }
  }

  // Sign Up
  @Post('signup')
  async signUp(@Body() inputs: AuthSignUpDto) {
    try {
      const data = await this.authService.signUp({
        email: inputs.email,
        name: inputs.name,
        userName: inputs.userName,
        avatar: inputs.avatar,
        bio: inputs.bio,
      });
      return { message: 'Success', data };
    } catch (error) {
      throw error;
    }
  }

  // Sign In
  @Post('signin')
  async signIn(@Body() inputs: AuthOtpRequestDto) {
    try {
      const data = await this.authService.signIn(inputs.email);
      return { message: 'Success', data };
    } catch (error) {
      throw error;
    }
  }

  // Verify Refresh Token
  @Post('verify-refresh-token')
  async verifyRefreshToken(@Body() inputs: VerifyRefreshTokenRequestDto) {
    try {
      const data = await this.authService.verifyRefreshToken(
        inputs.refreshToken,
      );
      return { message: 'Success', data };
    } catch (error) {
      throw error;
    }
  }
}
