import { Module } from '@nestjs/common';

import { ProductModule } from './product/product.module';
import { PrismaModule } from './prisma/prisma.module';
import { CategoryModule } from './category/category.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ProductModule, PrismaModule, CategoryModule, UserModule],
})
export class AppModule {}
