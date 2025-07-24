import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users/users.service';
import { User as UserModel } from '@prisma/client';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly userService: UsersService) {}

  @Get('/')
  getHello(): string {
    return 'Hello World!';
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  login(@Request() req: { user: UserModel }) {
    return req.user;
  }

  @Post('auth/signup')
  async signupUser(
    @Body() userData: { name: string; email: string; password: string },
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }
}
