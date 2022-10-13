import { Module } from '@nestjs/common';

import { ProductModule } from './product/product.module';
import { PrismaModule } from './prisma/prisma.module';
import { CategoryModule } from './category/category.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { appendFile } from 'fs';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [
    ProductModule,
    PrismaModule,
    CategoryModule,
    UserModule,
    AuthModule,
    CartModule,
  ],
})
export class AppModule {}
