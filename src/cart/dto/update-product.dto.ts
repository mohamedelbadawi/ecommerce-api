import { IsNotEmpty } from 'class-validator';

export class updateCartDto {
  @IsNotEmpty()
  total: number;
}
