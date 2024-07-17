import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { LikeDsongsService } from './like-dsongs.service';
import { LikeDsongDto } from './dto/create-like-dsong.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Liked Song')
@Controller('like-dsongs')
export class LikeDsongsController {
  constructor(private readonly likeDsongsService: LikeDsongsService) { }

  // Post like song
  @Post()
  postLikedSong(@Body() likedSongDto: LikeDsongDto) {
    return this.likeDsongsService.postLikedSong(likedSongDto);
  }

  // Get song liked
  @Get('liked-song')
  getLikedSong(@Query('userId') userId: number, @Query() songId: number) {
    return this.likeDsongsService.isSongLiked(userId, songId);
  }

}
