import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(
    name: string,
    pass: string,
  ): Promise<Omit<User, 'password'> | null> {
    console.log('Here --->', name, pass);

    const user = await this.usersService.user({
      email: name,
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
}
