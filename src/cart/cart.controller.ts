import { AddItemDto } from './dto/add-item.dto';
import { CartService } from './cart.service';
import { Controller, Get, Request, UseGuards, Body } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('cart')
export class CartController {
  constructor(public CartService: CartService) {}
  @Get('/')
  async getAllCarts() {
    return this.CartService.getAll();
  }
  @UseGuards(JwtAuthGuard)
  @Get('/addItem')
  async addItemToCart(@Request() req: any, @Body() AddItemDto: AddItemDto) {
    const data = {};
    const cart = await this.CartService.findUserCart(req.user.sub);

    data['userId'] = req.user.sub;
    data['productId'] = AddItemDto.productId;
    data['quantity'] = AddItemDto.quantity;
    data['cartId'] = cart.id;

    return this.CartService.addItemToCart(data);
  }
}
