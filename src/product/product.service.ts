import { Category } from './../category/entities/category.entity';
import { FilterProductDTO } from './dto/filter-product.dto';
import { Product } from './entities/product.entity';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable, Body } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    return await this.prisma.product.create({ data: createProductDto });
  }

  async getFilteredProducts(filterProductDTO: FilterProductDTO) {
    const { category, search } = filterProductDTO;
    const products = [];
    if (search) {
      const products = await this.prisma.product.findMany({
        where: {
          name: {
            search: search,
          },
        },
      });
    } else if (category) {
      const products = await this.prisma.product.findMany({
        where: { categoryId: category },
      });
    } else {
      const products = this.findAll();
    }
    return products;
  }
  async findAll() {
    return await this.prisma.product.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.product.findUnique({ where: { id } });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    return await this.prisma.product.update({
      data: updateProductDto,
      where: { id },
    });
  }

  async remove(id: number) {
    return await this.prisma.product.delete({ where: { id } });
  }
}
