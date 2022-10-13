import { IsNotEmpty, IsNumber } from 'class-validator';

export class AddItemDto {
  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
