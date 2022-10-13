import { IsNotEmpty, IsString } from 'class-validator';

export class Login {
  id: number;
  @IsString()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}
