import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class FollowingService {

  prisma = new PrismaClient()

  // Check follow
  async isFollowing(userId: number, followingUserId: number) {
    const follow = await this.prisma.following.findFirst({
      where: { followingUserId, userId }
    })
    return !!follow
  }

  // Follow
  async follow(userId: number, followingUserId: number) {
    return this.prisma.following.create({
      data: {
        userId,
        followingUserId
      }
    })
  }

  // unfollow
  async unfollow(userId: number, followingUserId: number) {
    return this.prisma.following.deleteMany({
      where: {
        userId,
        followingUserId
      }
    })
  }
}
