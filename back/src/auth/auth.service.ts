import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    pass: string,
  ): Promise<Omit<User, 'password'> | null> {
    console.log('Here --->', email, pass);

    const user = await this.usersService.user({
      email: email,
    });
    if (user && user.password) {
      const isMatch = await bcrypt.compare(pass, user.password);
      if (!isMatch) {
        return null;
      }
      const { ...result } = user;
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
}
