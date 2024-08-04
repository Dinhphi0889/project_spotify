import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ListFriendsService } from './list-friends.service';
import { CreateListFriendDto } from './dto/create-list-friend.dto';
import { ApiBody, ApiHeader, ApiProperty, ApiTags } from '@nestjs/swagger';
import { CybersoftTokenGuard } from 'src/strategy/tokenCyberSoft.strategy';
import { Roles } from 'src/Guards/roles.decorator';
import { Role } from 'src/Types/role.enum';
import { CheckTokenUser } from 'src/Guards/tokenUser.guard';

class TypeAddFriends {
  @ApiProperty()
  userId: number
  @ApiProperty()
  friendId: number
  @ApiProperty()
  roomChat: string
}

// Input token user
@ApiHeader({
  name: 'Token-User',
  description: 'Input token user',
  required: true
})
@UseGuards(CheckTokenUser)

// Input token cybersoft
@ApiHeader({
  name: 'tokenCyberSoft',
  description: 'Input token cybersoft',
  required: true
})
@UseGuards(CybersoftTokenGuard)

@ApiTags('LIST FRIENDS')
@Controller('api/')
export class ListFriendsController {
  constructor(private readonly listFriendsService: ListFriendsService) { }

  // Add friend
  @ApiBody({
    type: TypeAddFriends
  })
  @Post('/add-friends')
  addFriends(@Body() createListFriendDto: CreateListFriendDto) {
    return this.listFriendsService.addFriends(createListFriendDto);
  }

  // get all list friend
  @Get('/get-all-friends')
  findAll() {
    return this.listFriendsService.findAll();
  }

  // Get list friend by userId
  @Get('/get-list-friends/:userId')
  getListFriends(@Param('userId') id: string) {
    return this.listFriendsService.getListFriends(+id);
  }

  // Delete friends
  @Roles(Role.Admin)
  @Delete('/delete-friends/:id')
  remove(@Param('id') id: string) {
    return this.listFriendsService.remove(+id);
  }
}
