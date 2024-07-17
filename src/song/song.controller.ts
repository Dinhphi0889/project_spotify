import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { SongService } from './song.service';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { ApiBody, ApiProperty, ApiTags } from '@nestjs/swagger';

class TypeCreateSong {

  @ApiProperty()
  userId: number;

  @ApiProperty()
  viewer?: number;

  @ApiProperty()
  genreId: number;

  @ApiProperty()
  songName: string;

  @ApiProperty()
  duration?: number;

  @ApiProperty()
  popular: boolean;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  songImage?: string;

  @ApiProperty()
  publicDate?: string | Date;

  @ApiProperty()
  filePath?: string;

  @ApiProperty()
  discussQuality?: number;
}

@ApiTags('SONG')
@Controller('api/song')
export class SongController {
  constructor(private readonly songService: SongService) { }

  // Find all song
  @Get()
  findAll() {
    return this.songService.findAll();
  }

  // Find song by id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.songService.findOne(+id);
  }

  // Create new song
  @ApiBody({
    type: TypeCreateSong
  })
  @Post()
  create(@Body() createSongDto: CreateSongDto) {
    return this.songService.create(createSongDto);
  }

  // Edit song
  @ApiBody({
    type: TypeCreateSong
  })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateSongDto: UpdateSongDto) {
    return this.songService.update(+id, updateSongDto);
  }

  // Delete song
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.songService.remove(+id);
  }
}
