import { Injectable } from '@nestjs/common';
import { UserRepository } from './repository/user_repo';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  async findAll() {
    return this.userRepo.findAll();
  }
}
