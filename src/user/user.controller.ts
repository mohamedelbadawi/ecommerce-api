import { UserService } from './user.service';
import { Controller, Get } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private UserService: UserService) {}
  @Get('/')
  getAllUsers() {
    return this.UserService.findAll();
  }
}
