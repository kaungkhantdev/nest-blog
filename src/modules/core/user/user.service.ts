import { Injectable } from '@nestjs/common';
import { UserRepository } from './repository/user_repo'; // Adjust the path as needed
import { User } from '@prisma/client'; // Prisma-generated User type

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  // Create User
  async createUser(data: any): Promise<User> {
    try {
      return await this.userRepository.createUser(data);
    } catch (error) {
      throw error;
    }
  }

  // Find User by ID
  async findOneById(id: number): Promise<User | null> {
    try {
      return await this.userRepository.findByIdUser(id);
    } catch (error) {
      throw error;
    }
  }

  // Find User by Email
  async findByEmailUser(email: string): Promise<User | null> {
    try {
      return await this.userRepository.findByEmailUser(email);
    } catch (error) {
      throw error;
    }
  }

  // Find User by Username
  async findByUserName(userName: string): Promise<User | null> {
    try {
      return await this.userRepository.findByUserName(userName);
    } catch (error) {
      throw error;
    }
  }

  // Update User
  async updateUser(id: number, data: Partial<User>): Promise<User | null> {
    try {
      return await this.userRepository.updateUser(id, data);
    } catch (error) {
      throw error;
    }
  }
}
