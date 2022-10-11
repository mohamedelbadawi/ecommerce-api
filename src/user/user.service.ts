import { CreateUserDTO } from './dto/create-user.dto';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import * as argon from 'argon2';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async addUser(CreateUserDTO: CreateUserDTO) {
    const hashedPassword = await argon.hash(CreateUserDTO.password);
    const data = {
      name: CreateUserDTO.name,
      email: CreateUserDTO.email,
      password: hashedPassword,
    };
    const newUser = await this.prisma.user.create({ data: data });
    delete newUser.password;
    delete newUser.createdAt;
    delete newUser.updatedAt;
    return newUser;
  }

  async findUser(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email: email } });
    if (!user) throw new NotFoundException("this user doesn't exists");
    return user;
  }

  async findAll() {
    return this.prisma.user.findMany();
  }
}
