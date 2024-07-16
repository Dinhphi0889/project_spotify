import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Put, HttpCode, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('/api/user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  // find all user
  @ApiTags('USER')
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  // find user by id
  @ApiTags('USER')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  // Upload img
  @ApiTags('USER')
  @UseInterceptors(FileInterceptor("image", {
    storage: diskStorage({
      destination: process.cwd() + "/public/imgs",
      filename: (req, file, callback) => {
        callback(null, new Date().getTime() + "_" + file.originalname)
      }
    })
  }))
  @Post('/upload')
  async upload(@UploadedFile() file: Express.Multer.File) {
    return file
  }

  // Edit user
  @ApiTags('USER')
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  // Delete user
  @ApiTags('USER')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @ApiTags('Auth')
  @Post('/register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }

  @ApiTags('Auth')
  @Post('/login')
  async login(@Body() { account, password }: { account: string; password: string }): Promise<any> {
    const user = await this.userService.loginUser(account, password)
    if (user) {
      return user
    } else {
      return {
        message: 'Account or password is incorrect'
      }
    }
  }

}
