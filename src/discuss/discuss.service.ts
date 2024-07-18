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

  //find one discuss
  findOne(id: number) {
    return this.prisma.discuss.findUnique({
      where: { discussId: id },
    });
  }

  //update discuss
  update(id: number, updateDiscussDto: UpdateDiscussDto) {
    return this.prisma.discuss.update({
      where: { discussId: id },
      data: updateDiscussDto,
    });;
  }

  //delete discuss
  remove(id: number) {
    return this.prisma.discuss.delete({
      where: { discussId: id },
    });
  }
}
