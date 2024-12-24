import { IsString } from 'class-validator';

export class VerifyRefreshTokenRequestDto {
  @IsString()
  refreshToken: string;
}
