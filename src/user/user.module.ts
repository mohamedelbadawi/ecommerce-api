import { ProductService } from './../product/product.service';
import { CartService } from './../cart/cart.service';
import { PrismaService } from './../prisma/prisma.service';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  providers: [UserService, PrismaService, CartService, ProductService],

  controllers: [UserController],
})
export class UserModule {}
