import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsString()
  @IsNotEmpty()
  @IsString()
  email: string;
  @IsNotEmpty()
  password: string;
  roles: string[];
}
