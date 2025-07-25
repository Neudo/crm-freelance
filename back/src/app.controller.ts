/* eslint-disable @typescript-eslint/require-await */
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
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt.auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly userService: UsersService,
    private authService: AuthService,
  ) {}

  @Get('/')
  getHello(): string {
    return 'Hello World!';
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: { user: UserModel }) {
    return req.user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req: { user: UserModel }) {
    return this.authService.login(req.user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/logout')
  async logout(@Request() req: { logout: () => void }) {
    return req.logout();
  }
  @Post('auth/signup')
  async signupUser(
    @Body() userData: { name: string; email: string; password: string },
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }
}
