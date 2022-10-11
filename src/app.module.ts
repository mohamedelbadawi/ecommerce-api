import { Module } from '@nestjs/common';

import { ProductModule } from './product/product.module';
import { PrismaModule } from './prisma/prisma.module';
import { CategoryModule } from './category/category.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { appendFile } from 'fs';

@Module({
  imports: [
    ProductModule,
    PrismaModule,
    CategoryModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
