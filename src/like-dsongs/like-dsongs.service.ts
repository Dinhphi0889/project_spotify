import { Injectable } from '@nestjs/common';
import { LikeDsongDto } from './dto/create-like-dsong.dto';
import { UpdateLikeDsongDto } from './dto/update-like-dsong.dto';
import { LikedSong, PrismaClient } from '@prisma/client';

@Injectable()
export class LikeDsongsService {

  prisma = new PrismaClient()


  async postLikedSong(LikeDsongDto: LikeDsongDto) {
    // return this.prisma.likedSong.create(LikeDsongDto)
  }

  async isSongLiked(userId: number, songId) {
    const likedSong = await this
  }

}
