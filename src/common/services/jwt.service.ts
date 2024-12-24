import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

export interface JwtPayload {
  userId: number;
}

@Injectable()
export class JwtUtilService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  getJwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET') || 'secret';
  }

  getJwtAccessTokenSecret(): string {
    return (
      this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET') || 'secret'
    );
  }

  getJwtExpireMinutes(): string {
    return this.configService.get<string>('JWT_EXPIRATION_MINUTES') || '15';
  }

  getJwtAccessTokenExpireMinutes(): string {
    return this.configService.get<string>(
      'JWT_ACCESS_TOKEN_EXPIRATION_MINUTES',
    );
  }

  getJwtExpiration(expirationMinutes: string): number {
    const parsedMinutes = parseInt(expirationMinutes, 10);
    if (isNaN(parsedMinutes)) {
      throw new Error('Invalid JWT expiration time');
    }
    return parsedMinutes * 60; // Return seconds
  }

  async generateJwt(
    userId: number,
    secret: string,
    expirationMinutes: string,
  ): Promise<string> {
    const expirationSeconds = this.getJwtExpiration(expirationMinutes);

    const payload: JwtPayload = { userId };

    return this.jwtService.signAsync(payload, {
      secret,
      expiresIn: expirationSeconds,
    });
  }

  async verifyJwt(token: string, secret: string): Promise<JwtPayload> {
    try {
      return this.jwtService.verifyAsync<JwtPayload>(token, { secret });
    } catch (err) {
      throw new UnauthorizedException(
        'Invalid or expired token ' + err.message,
      );
    }
  }
}
