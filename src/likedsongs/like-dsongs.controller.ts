import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { LikeDsongsService } from './like-dsongs.service';
import { LikeDsongDto } from './dto/create-like-dsong.dto';
import { ApiBody, ApiProperty, ApiTags } from '@nestjs/swagger';

class TypePostLike {
  @ApiProperty()
  idUser: number

  @ApiProperty()
  idSongLiked: number

  @ApiProperty()
  liked: Boolean
}

class TypePostUnLike {
  @ApiProperty()
  idUser: number

  @ApiProperty()
  idSongLiked: number
}

@ApiTags('LIKED SONG')
@Controller('api/')
export class LikeDsongsController {
  constructor(private readonly likeDsongsService: LikeDsongsService) { }

  // Post like song
  @ApiBody({
    type: TypePostLike,
  })
  @Post('/liked')
  postLikedSong(@Body() likedSongDto: LikeDsongDto) {
    return this.likeDsongsService.postLikedSong(likedSongDto.idSongLiked, likedSongDto.idUser);
  }

  // Unlike
  @ApiBody({
    type: TypePostUnLike
  })
  @Delete('/unlike')
  unlikeSong(@Body() LikeDsongDto: LikeDsongDto) {
    return this.likeDsongsService.unlikeSong(LikeDsongDto.idSongLiked, LikeDsongDto.idUser)
  }

  // Get song liked
  @Get('song-liked')
  getLikedSong(@Param('userId') userId: number, @Param('songId') songId: number) {
    return this.likeDsongsService.getSongLiked(userId, songId);
  }

}
