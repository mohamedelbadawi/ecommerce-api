import { IsNotEmpty, IsNumber } from 'class-validator';

export class ItemDto {
  @IsNotEmpty()
  @IsNumber()
  productId: number;
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
  @IsNumber()
  @IsNotEmpty()
  price: number;
  @IsNumber()
  @IsNotEmpty()
  cartId: number;
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
