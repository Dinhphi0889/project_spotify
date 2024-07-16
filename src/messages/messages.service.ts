import { Injectable } from '@nestjs/common';
import { Message, Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class MessagesService {
  prisma = new PrismaClient()

  findAll() {
    return this.prisma.message.findMany()
  }


  async sendMessage(data: Prisma.MessageCreateInput): Promise<Message> {
    return this.prisma.message.create({ data })
  }

  async getMessageByRoom(roomId: string): Promise<Message[]> {
    return this.prisma.message.findMany({ where: { roomChat: roomId } })
  }


}
