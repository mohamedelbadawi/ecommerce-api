import { JwtStrategy } from './strategies/jwt.strategy';
import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt'; // 1

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string) {
    const user = await this.userService.findUser(email);
    const passwordCheck = await argon.verify(user.password, password);
    if (user && passwordCheck) {
      return user;
    }
    return null;
  }
  async login(user: any) {
    const payload = {
      email: user.email,
      sub: user.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
