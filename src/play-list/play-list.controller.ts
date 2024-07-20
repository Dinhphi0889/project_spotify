import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { PlayListService } from './play-list.service';
import { AddSongsToPlaylistDto, CreatePlayListDto } from './dto/create-play-list.dto';
import { UpdatePlayListDto } from './dto/update-play-list.dto';
import { ApiBody, ApiProperty, ApiTags } from '@nestjs/swagger';

class TypeAddNewPlaylist {
  @ApiProperty()
  userId: number
  @ApiProperty()
  imagePath: string
  @ApiProperty()
  playlistName: string
  @ApiProperty()
  songsId: number
  @ApiProperty()
  description: string
  @ApiProperty()
  createDate: Date
  @ApiProperty()
  songName: string
  @ApiProperty()
  playlistId: number
}

class TypeEditPlayList {
  @ApiProperty()
  playlistName: string
  @ApiProperty()
  description: string
}

@ApiTags('PLAYLIST')
@Controller('api')
export class PlayListController {
  constructor(private readonly playListService: PlayListService) { }

  //Add new playlist 
  @ApiBody({
    type: TypeAddNewPlaylist
  })
  @Post('/add-playlist')
  createPlaylist(@Body() createPlayListDto: CreatePlayListDto) {
    return this.playListService.createPlaylist(createPlayListDto);
  }

  // Get all playlist
  @Get('/get-all-playlist')
  findAll() {
    return this.playListService.findAll();
  }

  // Add song to playlist
  @ApiBody({
    type: TypeAddNewPlaylist
  })
  @Post('add-song-to-playlist')
  async addSongToPlaylist(@Body() addSongToPlaylist: AddSongsToPlaylistDto) {
    return this.playListService.addSongToPlaylist(addSongToPlaylist);
  }
  
  // Find song in playlist
  @Get(':id/song')
  async getSongInPlaylist(@Param('id', ParseIntPipe) id: number) {
    const songs = await this.playListService.getSongInPlaylist(id)
    if (!songs) {
      throw new NotFoundException(`Playlist with ID ${id} not found`);
    }
    return songs

  }

  // Edit Playlist
  @ApiBody({
    type: TypeEditPlayList
  })
  @Put('edit-playlist/:id')
  editPlaylist(@Param('id') id: string, @Body() UpdatePlayListDto: UpdatePlayListDto) {
    return this.playListService.editPlaylist(+id, UpdatePlayListDto);
  }

  // Delete Playlist
  @Delete('remove-playlist/:id')
  remove(@Param('id') id: string) {
    return this.playListService.remove(+id);
  }
}
