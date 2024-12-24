import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/services/prisma.service'; // Adjust path if needed
import { User } from '@prisma/client'; // Prisma-generated User type

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  // Create User
  async createUser(user: any): Promise<User> {
    try {
      return await this.prisma.user.create({
        data: {
          email: user.email,
          username: user.username,
          verifyAt: user.verifyAt,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  // Update User by ID
  async updateUser(id: number, data: Partial<User>): Promise<User | null> {
    try {
      return await this.prisma.user.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw error;
    }
  }

  // Find User by ID
  async findByIdUser(id: number): Promise<User | null> {
    try {
      return await this.prisma.user.findUnique({
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  }

  // Find User by Email
  async findByEmailUser(email: string): Promise<User | null> {
    try {
      return await this.prisma.user.findUnique({
        where: { email },
      });
    } catch (error) {
      throw error;
    }
  }

  // Find User by UserName
  async findByUserName(username: string): Promise<User | null> {
    try {
      return await this.prisma.user.findUnique({
        where: { username },
      });
    } catch (error) {
      throw error;
    }
  }
}
