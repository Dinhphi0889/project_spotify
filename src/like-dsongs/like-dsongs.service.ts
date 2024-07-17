import { Injectable } from '@nestjs/common';
import { LikeDsongDto } from './dto/create-like-dsong.dto';
import { UpdateLikeDsongDto } from './dto/update-like-dsong.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class LikeDsongsService {
  prisma = new PrismaClient()

  
  likedSong(LikeDsongDto: LikeDsongDto) {
    return this.prisma.likedSong
  }

  findOne(id: number) {
    return `This action returns a #${id} likeDsong`;
  }

}
