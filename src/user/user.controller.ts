import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Put, HttpCode, HttpStatus, HttpException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('USER')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  // find all user
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  // Create new user
  @Post()
  @HttpCode(HttpStatus.OK)
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.create(createUserDto);
      return user
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error:'Request Failed'
      }, HttpStatus.BAD_REQUEST)
    }
  }

  // Upload img
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

  // find user by id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  // Edit user
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  // Delete user

  @Delete(':id')
  remove(@Param('id') id: string) {

    return this.userService.remove(+id);
  }
}
