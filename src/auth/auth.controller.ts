import { CartService } from './../cart/cart.service';
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
import { LocalAuthGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private cartService: CartService,
  ) {}
  @Post('/register')
  async register(@Body() CreateUserDTO: CreateUserDTO) {
    const user = await this.userService.addUser(CreateUserDTO);
    const cart = await this.cartService.createCart(user.id);
    return user;
  }
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
