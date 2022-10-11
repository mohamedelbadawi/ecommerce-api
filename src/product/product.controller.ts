import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilterProductDTO } from './dto/filter-product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }
  async getProducts(@Query() filterProductDTO: FilterProductDTO) {
    const products = this.productService.getFilteredProducts(filterProductDTO);
    return products;
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const product = this.productService.findOne(+id);
    if (!product) throw new NotFoundException('Product does not exist!');
    return product;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    const product = this.productService.update(+id, updateProductDto);
    if (!product) throw new NotFoundException('Product does not exist!');
    return product;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const product = this.productService.remove(+id);
    if (!product) throw new NotFoundException('Product does not exist!');
    return product;
  }
}
