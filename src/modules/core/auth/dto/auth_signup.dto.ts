import { IsEmail, IsString, IsOptional } from 'class-validator';

export class AuthSignUpDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  userName: string;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsString()
  bio?: string;
}
