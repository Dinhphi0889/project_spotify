import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { ApiTags } from '@nestjs/swagger';
import { Message, Prisma } from '@prisma/client';

@ApiTags('MESSAGES')
@Controller('api/messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) { }

  @Get()
  findAll(): Promise<Message[]> {
    return this.messagesService.findAll();
  }

  @Get('/byRoom')
  async getMessageByRoom(@Query("roomChat") roomChat:string):Promise<Message[]>{
    return this.messagesService.getMessageByRoom(roomChat)
  }

  @Post('/byRoom')
  async sendMessage(@Body() messageData: Prisma.MessageCreateInput): Promise<Message> {
    return this.messagesService.sendMessage(messageData)
  }

  // @Get()
  // async getMessageByRoom()
}
