import { Get, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(private config: ConfigService) { }
  prisma = new PrismaClient

  // get all user
  async findAll() {
    return this.prisma.user.findMany();
  }

  // create new user
  async create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        account: createUserDto.account,
        name: createUserDto.name,
        chanalName: createUserDto.chanalName,
        pathImage: createUserDto.pathImage,
        desciption: createUserDto.desciption,
        refreshToken: createUserDto.refreshToken,
        banner: createUserDto.banner,
        role: createUserDto.role,
        password: createUserDto.password,
        nationality: createUserDto.nationality,
      }
    });
  }

  // find user by id
  async findOne(id: number) {
    return this.prisma.user.findUnique({ where: { userId: id } });
  }

  // update user
  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { userId: id },
      data: {
        account: updateUserDto.account,
        name: updateUserDto.name,
        chanalName: updateUserDto.chanalName,
        pathImage: updateUserDto.pathImage,
        desciption: updateUserDto.desciption,
        refreshToken: updateUserDto.refreshToken,
        banner: updateUserDto.banner,
        role: updateUserDto.role,
        password: updateUserDto.password,
        nationality: updateUserDto.nationality,
      }
    })
  }

  remove(id: number) {
    return this.prisma.user.delete({ where: { userId: id } });
  }
}
