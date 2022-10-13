import { CartService } from './../cart/cart.service';
import { JwtAuthGuard } from './../auth/guards/jwt.guard';
import { UserService } from './user.service';
import { Controller, Request, Get, UseGuards, Param } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(
    private UserService: UserService,
    private cartService: CartService,
  ) {}
  @Get('/')
  getAllUsers() {
    return this.UserService.findAll();
  }
  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async getProfile(@Request() req) {
    return req.user;
  }
  @UseGuards(JwtAuthGuard)
  @Get('/cart')
  async getCart(@Request() req: any) {
    return this.cartService.findUserCart(req.user.sub);
  }
  @Get('/:email')
  async findUser(@Param('email') email: string) {
    return this.UserService.findUser(email);
  }
}
