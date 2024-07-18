import { HttpStatus, Injectable } from '@nestjs/common';
import { LikeDsongDto } from './dto/create-like-dsong.dto';
import { LikedSong, PrismaClient } from '@prisma/client';

@Injectable()
export class LikeDsongsService {

  prisma = new PrismaClient()

  // Like
  async postLikedSong(songId: number, userId: number) {
    const userExists = await this.prisma.user.findUnique({ where: { userId: userId } });
    if (!userExists) {
      throw HttpStatus.BAD_REQUEST
    }
    return this.prisma.likedSong.create({
      data: {
        idSongLiked: songId,
        idUser: userId,
        liked: true
      }
    })
  }

  // Unlike
  async unlikeSong(songId: number, userId: number) {
    return this.prisma.likedSong.deleteMany({
      where: {
        idUser: userId,
        idSongLiked: songId,
      }
    })
  }

  async getSongLiked(userId: number, songId) {
    return this.prisma.likedSong.findFirst({
      where: {
        idUser: userId,
        idSongLiked: songId,
      },
      include: {
        Song: true,

      }
    })
  }

}
