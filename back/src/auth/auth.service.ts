import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(username: string, password: string) {
    // Check if user already exists
    const existingUser = await this.usersService.findOne(username);
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Create new user (this would typically involve saving to database)
    const newUser = await this.usersService.create(username, password);
    
    // Generate token for the new user
    const payload = { username: newUser.username, sub: newUser.userId };
    return {
      access_token: this.jwtService.sign(payload),
      user: { username: newUser.username, userId: newUser.userId },
    };
  }
}
