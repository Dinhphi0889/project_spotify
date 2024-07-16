import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RecentSongsService } from './recent-songs.service';
import { CreateRecentSongDto } from './dto/create-recent-song.dto';
import { UpdateRecentSongDto } from './dto/update-recent-song.dto';
import { ApiTags } from '@nestjs/swagger';
import { Prisma, RecentSong } from '@prisma/client';

@ApiTags('RECENT SONG')
@Controller('api/recent-songs')
export class RecentSongsController {
  constructor(private readonly recentSongsService: RecentSongsService) { }


  // get recentSong via userId
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recentSongsService.findOne(+id);
  }

  // post recentSong
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
