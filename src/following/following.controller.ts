import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { FollowingService } from './following.service';
import { ApiBody, ApiHeader, ApiProperty, ApiTags } from '@nestjs/swagger';
import { CybersoftTokenGuard } from 'src/strategy/tokenCyberSoft.strategy';

class TypeFollow {
  @ApiProperty()
  userId: number
  @ApiProperty()
  followingUserId: number
}
@ApiHeader({
  name: 'tokenCyberSoft',
  description: 'Nhập token cybersoft',
  required: true
})
@UseGuards(CybersoftTokenGuard)
@ApiTags('FOLLOWING')
@Controller('api/')
export class FollowingController {
  constructor(private readonly followingService: FollowingService) { }

  // Check Follow
  @Get('is-following')
  async isFollowing(@Query('userId', ParseIntPipe) userId: number, @Query('followingUserId', ParseIntPipe) followingUserId: number): Promise<{ isFollowing: Boolean }> {
    const isFollowing = await this.followingService.isFollowing(userId, followingUserId)
    return { isFollowing }
  }

  // Follow
  @ApiBody({
    type: TypeFollow
  })
  @Post('send-follow')
  async follow(@Body('userId') userId: number, @Body('followingUserId') followingUserId: number) {
    return this.followingService.isFollowing(userId, followingUserId)
  }

  // Unfollow
  @ApiBody({
    type: TypeFollow
  })
  @Delete('unfollow')
  unfollow(@Body('userId') userId: number, @Body('followingUserId') followingUserId: number) {
    return this.followingService.unfollow(userId, followingUserId)
  }

}
