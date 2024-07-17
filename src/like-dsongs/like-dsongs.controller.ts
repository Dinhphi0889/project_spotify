import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LikeDsongsService } from './like-dsongs.service';
import { LikeDsongDto } from './dto/create-like-dsong.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Liked Song')
@Controller('like-dsongs')
export class LikeDsongsController {
  constructor(private readonly likeDsongsService: LikeDsongsService) {}

  @Post()
  likedSong(@Body() likedSongDto: LikeDsongDto) {
    return this.likeDsongsService.likedSong(likedSongDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.likeDsongsService.findOne(+id);
  }



}
