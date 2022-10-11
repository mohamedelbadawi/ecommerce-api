import {
  Controller,
  Body,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDTO } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { Login } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}
  @Post('/register')
  async register(@Body() CreateUserDTO: CreateUserDTO) {
    const user = await this.userService.addUser(CreateUserDTO);
    return user;
  }
  @Post('/login')
  async login(@Body() Login: Login) {
    return this.authService.login(Login);
  }
  @UseGuards(JwtAuthGuard)
  @Get('/user')
  async getProfile(@Request() req) {
    return req.user;
  }
}
