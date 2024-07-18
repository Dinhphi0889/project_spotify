import { Injectable } from '@nestjs/common';
import { CreateDiscussDto } from './dto/create-discuss.dto';
import { UpdateDiscussDto } from './dto/update-discuss.dto';
import { PrismaClient } from '@prisma/client';


@Injectable()
export class DiscussService {
  prisma = new PrismaClient()

  // Post discuss
  async postDiscuss(createDiscussDto: CreateDiscussDto) {
    return this.prisma.discuss.create({
      data: {
        userId: createDiscussDto.userId,
        songId: createDiscussDto.songId,
        discussId: createDiscussDto.discussId,
        content: createDiscussDto.content,
        discussDate: createDiscussDto.discussDate,
        replayDiscussId: createDiscussDto.replayDiscuss,
      }
    });
  }

  // get all discuss
  getAllDiscuss() {
    return this.prisma.discuss.findMany();
  }


  findOne(id: number) {
    return `This action returns a #${id} discuss`;
  }

  update(id: number, updateDiscussDto: UpdateDiscussDto) {
    return `This action updates a #${id} discuss`;
  }

  remove(id: number) {
    return `This action removes a #${id} discuss`;
  }
}
