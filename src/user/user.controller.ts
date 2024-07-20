import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Put, HttpCode, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiBody, ApiProperty, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';

class TypeUserDTO {
  @ApiProperty()
  userId: number

  @ApiProperty()
  account: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  nationality: string;

  @ApiProperty()
  chanalName: string;

  @ApiProperty()
  pathImage: string;

  @ApiProperty()
  desciption: string;

  @ApiProperty()
  refreshToken: string;

  @ApiProperty()
  banner: string;

  @ApiProperty()
  role: string;

  @ApiProperty()
  password: string;

}

class TypeUserLogin {
  @ApiProperty()
  account: string

  @ApiProperty()
  password: string
}

@Controller('/api')
export class UserController {
  constructor(private readonly userService: UserService) { }

  // find all user
  @ApiTags('USER')
  @Get('all-users')
  findAll() {
    return this.userService.findAll();
  }

  // find user by id
  @ApiTags('USER')
  @Get('find-user/:id')
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
  @Post('/upload-img')
  async upload(@UploadedFile() file: Express.Multer.File) {
    return file
  }

  // Edit user
  @ApiBody({
    type: TypeUserDTO
  })
  @ApiTags('USER')
  @Put('edit-user/:id')
  update(@Param('userId') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  // Delete user
  @ApiTags('USER')
  @Delete('edit-user/:id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  // Login & Register
  @ApiTags('Auth')
  @ApiBody({
    type: TypeUserDTO
  })
  @Post('/register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }

  @ApiBody({
    type: TypeUserLogin
  })
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
