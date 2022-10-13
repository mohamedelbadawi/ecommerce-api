import { ProductService } from './../product/product.service';
import { updateCartDto } from './dto/update-product.dto';
import { ItemDto } from './dto/item.dto';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CartService {
  constructor(
    private prisma: PrismaService,
    private ProductService: ProductService,
  ) {}

  async createCart(userId: number) {
    const newCart = await this.prisma.cart.create({
      data: { userId: userId, total: 0 },
    });
    return newCart;
  }
  async updateCart(id: number, data: updateCartDto) {
    return await this.prisma.cart.update({ where: { id }, data: data });
  }

  getAll() {
    return this.prisma.cart.findMany();
  }

  async findUserCart(id: number) {
    return await this.prisma.cart.findFirst({
      where: { userId: id },
      include: { cartItem: true },
    });
  }
  async findCartItem(productId: number, cartId: number) {
    return await this.prisma.cartItem.findFirst({
      where: { productId: productId, cartId: cartId },
    });
  }

  async updateItemQty(id: number, qty: number, price: number) {
    return await this.prisma.cartItem.update({
      where: { id },
      data: { quantity: qty, subTotal: qty * price },
    });
  }

  async recalculateCartTotal(cartId: number) {
    //first get all items subtotal
    await this.prisma.cart.findMany({
      include: {
        cartItem: {
          select: {
            subTotal: true,
          },
        },
      },
    });
  }
  async addItemToCart(data: any) {
    // return data;
    const item = this.findCartItem(data['productId'], data['cartId']);
    if (item) {
      await this.updateItemQty(item['id'], data['quantity'], item['price']);
    } else {
      const product = await this.prisma.product.findFirst({
        where: { id: data['productId'] },
      });

      const subTotal = Number(data['quantity']) * Number(product.price);
      this.prisma.cartItem.create({
        data: {
          cartId: data['cartId'],
          quantity: data['quantity'],
          subTotal: subTotal,
          price: product.price,
          productId: data['productId'],
        },
      });
      return 'Done';
    }
  }
}
