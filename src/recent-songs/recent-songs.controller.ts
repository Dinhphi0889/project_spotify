import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RecentSongsService } from './recent-songs.service';
import { CreateRecentSongDto } from './dto/create-recent-song.dto';

import { ApiBody, ApiProperty, ApiTags } from '@nestjs/swagger';
import { RecentSong } from '@prisma/client';

class TypePostRecentSong {
  @ApiProperty()
  userId: number

  @ApiProperty()
  songId: number

  @ApiProperty()
  time: Date
}

@ApiTags('RECENT SONG')
@Controller('api/recent-songs')
export class RecentSongsController {
  constructor(private readonly recentSongsService: RecentSongsService) { }

  // Get recentSong via userId
  @Get(':userId')
  findOne(@Param('userId') id: string) {
    return this.recentSongsService.findOne(+id);
  }

  // Post recentSong
  @ApiBody({
    type: TypePostRecentSong
  })
  @Post()
  PostRecentSongs(@Body() recentSongData: CreateRecentSongDto): Promise<RecentSong> {
    return this.recentSongsService.PostRecentSongs(recentSongData);
  }

  // Delete recentSong
  @Delete(':id')
  async deleteSong(@Query('id') idTable: number) {
    return this.recentSongsService.deleteSong(+idTable)
  }

}
