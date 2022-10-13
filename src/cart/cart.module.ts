import { ProductService } from './../product/product.service';
import { PrismaService } from './../prisma/prisma.service';
import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';

@Module({
  providers: [CartService, PrismaService, ProductService],
  controllers: [CartController],
})
export class CartModule {}
