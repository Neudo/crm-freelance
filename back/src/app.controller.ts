import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users/user.service';
import { User as UserModel } from '@prisma/client';

@Controller()
export class AppController {
  constructor(private readonly userService: UsersService) {}

  @Get('/')
  getHello(): string {
    return 'Hello World!';
  }

  @Post('auth/signup')
  async signupUser(
    @Body() userData: { name: string; email: string; password: string },
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }
}
