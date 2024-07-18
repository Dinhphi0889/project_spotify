import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { DiscussService } from './discuss.service';
import { CreateDiscussDto } from './dto/create-discuss.dto';
import { UpdateDiscussDto } from './dto/update-discuss.dto';
import { ApiBody, ApiProperty, ApiTags } from '@nestjs/swagger';


class TypePostDiscuss {
  @ApiProperty()
  userId: number
  @ApiProperty()
  songId: number
  @ApiProperty()
  disCussId: number
  @ApiProperty()
  content: string
  @ApiProperty()
  discussDate: Date
  @ApiProperty()
  replayDiscussId: string
}

@ApiTags('DISCUSS')
@Controller('api/')
export class DiscussController {
  constructor(private readonly discussService: DiscussService) { }

  // Post Discuss
  @ApiBody({
    type: TypePostDiscuss
  })
  @Post('send-discuss')
  postDiscuss(@Body() createDiscussDto: CreateDiscussDto) {
    return this.discussService.postDiscuss(createDiscussDto);
  }

  // get all discuss
  @Get('/all-discuss')
  getAllDiscuss() {
    return this.discussService.getAllDiscuss();
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.discussService.findOne(+id);
  }

  // Edit discuss
  @Put(':id')
  update(@Param('id') id: string, @Body() updateDiscussDto: UpdateDiscussDto) {
    return this.discussService.update(+id, updateDiscussDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.discussService.remove(+id);
  }
}
