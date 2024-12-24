import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { OtpService } from '@/modules/core/otp/otp.service';
import { JwtService } from '@nestjs/jwt';
import * as moment from 'moment';
import { OtpGenerateService } from '@/common/services/otp_generate.service';
import { MailService } from '@/common/services/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly otpService: OtpService,
    private readonly emailService: MailService,
    private readonly jwtService: JwtService,
    private readonly otpGenerateService: OtpGenerateService,
  ) {}

  private defineExpire(): number {
    return moment().add(1, 'minute').unix();
  }

  private async buildResponse(
    user: any,
    showToken: boolean,
    token?: any,
  ): Promise<any> {
    const response: any = {
      email: user.email,
      userName: user.userName,
    };

    if (showToken) {
      response.refreshToken = token.refreshToken;
      response.accessToken = token.accessToken;
    }

    return response;
  }

  private async createUser(email: string): Promise<any> {
    const user = {
      email,
      username: email.split('@')[0],
      verifyAt: moment().unix(),
    };

    const newUser = await this.userService.createUser(user);
    if (!newUser) {
      throw new BadRequestException('Failed to create user');
    }

    return newUser;
  }

  private async createOtp(email: string, otp: string): Promise<void> {
    const otpData = {
      email,
      otp,
      expiresAt: this.defineExpire(),
    };

    await this.otpService.createOtp(otpData);
  }

  private async updateOtp(email: string, otp: string): Promise<void> {
    await this.otpService.updateOtpByEmail(email, otp, this.defineExpire());
  }

  private async sendOtpEmail(otp: string, email: string): Promise<string> {
    const data = { OTP: otp };

    try {
      await this.emailService.sendEmail(email, 'Testing', data, 'otp_mail');
      return 'OTP code has been sent.';
    } catch (error) {
      throw new BadRequestException('Failed to send OTP ' + error.message);
    }
  }

  private async generateTokens(userId: number): Promise<any> {
    const payload = { userId };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    });

    return { accessToken, refreshToken };
  }

  async signUp(data: any): Promise<any> {
    const { email } = data;

    if (!email) {
      throw new BadRequestException('Email is required');
    }

    const existingOtp = await this.otpService.getOtpByEmail(email);
    if (!existingOtp) {
      throw new UnauthorizedException('Please verify your email first.');
    }

    const existingUser = await this.userService.findByEmailUser(email);
    if (existingUser) {
      throw new BadRequestException('Email is already taken');
    }

    if (data.userName) {
      const userNameTaken = await this.userService.findByUserName(
        data.userName,
      );
      if (userNameTaken) {
        throw new BadRequestException('Username is already taken');
      }
    }

    const updatedUser = await this.userService.updateUser(
      existingUser?.id,
      data,
    );
    const tokens = await this.generateTokens(updatedUser.id);

    return this.buildResponse(updatedUser, true, tokens);
  }

  async signIn(email: string): Promise<string> {
    const existingUser = await this.userService.findByEmailUser(email);

    if (!existingUser) {
      throw new UnauthorizedException('User needs to be created first.');
    }

    return this.getOtpViaEmail(email);
  }

  async getOtpViaEmail(email: string): Promise<string> {
    const existingOtp = await this.otpService.getOtpByEmail(email);
    const otp = this.otpGenerateService.generateOtp(6);

    if (!existingOtp) {
      await this.createOtp(email, otp);
    } else {
      await this.updateOtp(email, otp);
    }

    return this.sendOtpEmail(otp, email);
  }

  async verifyOtpViaEmail(data: any): Promise<any> {
    const { email, otp } = data;

    if (!email || !otp) {
      throw new BadRequestException('Email and OTP are required');
    }

    const storedOtp = await this.otpService.getOtpByEmail(email);
    if (!storedOtp) {
      throw new UnauthorizedException('Email does not exist');
    }

    if (storedOtp.expiresAt < moment().unix()) {
      throw new UnauthorizedException('OTP has expired');
    }

    if (storedOtp.otp !== otp) {
      throw new UnauthorizedException('Invalid OTP');
    }

    const user = await this.userService.findByEmailUser(email);
    if (!user) {
      const newUser = await this.createUser(email);
      return this.buildResponse(newUser, false);
    }

    const tokens = await this.generateTokens(user.id);
    return this.buildResponse(user, true, tokens);
  }

  async verifyRefreshToken(token: string): Promise<any> {
    const payload = await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_REFRESH_SECRET,
    });

    const tokens = await this.generateTokens(payload.userId);
    return tokens;
  }
}
