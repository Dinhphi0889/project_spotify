import { Get, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient, User } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(private config: ConfigService) { }
  prisma = new PrismaClient()

  // get all user
  async findAll() {
    return this.prisma.user.findMany();
  }

  // find user by id
  async findOne(id: number) {
    return this.prisma.user.findUnique({ where: { userId: id } });
  }

  // Edit user
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
      },
    });
  }

  // Delete user
  remove(id: number) {
    return this.prisma.user.delete({ where: { userId: id } });
  }

  // check account user has used?
  async checkDuplicateAccount(account: string): Promise<Boolean> {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        account,
      },
    });
    return !!existingUser;
  }

  // register user
  async create(createUserDto: CreateUserDto) {
    const isAccount = await this.checkDuplicateAccount(createUserDto.account);
    if (isAccount) {
      throw HttpStatus.BAD_REQUEST;
    } else {
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(createUserDto.password, salt);
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
          password: passwordHash,
          nationality: createUserDto.nationality,
        },
      });
    }
  }

  // login
  async loginUser(account: string, password: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        account,
        password,
      },
    });
    return user;
  }
}
