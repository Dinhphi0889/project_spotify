import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { ApiBody, ApiProperty, ApiTags } from '@nestjs/swagger';
import { Message, Prisma } from '@prisma/client';

class TypeSendMessage {
  @ApiProperty()
  contentMess: string

  @ApiProperty()
  idSender: 1

  @ApiProperty()
  timeSend?: Date

  @ApiProperty()
  roomChat: string
}

@ApiTags('MESSAGES')
@Controller('api/messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) { }

  // Get all Message
  @Get()
  findAll(): Promise<Message[]> {
    return this.messagesService.findAll();
  }

  // Get message by room
  @Get('/byRoom')
  async getMessageByRoom(@Query("roomChat") roomChat: string): Promise<Message[]> {
    return this.messagesService.getMessageByRoom(roomChat)
  }

  // send message
  @ApiBody({
    type: TypeSendMessage
  })
  @Post('/byRoom')
  async sendMessage(@Body() messageData: Prisma.MessageCreateInput): Promise<Message> {
    return this.messagesService.sendMessage(messageData)
  }

  // @Get()
  // async getMessageByRoom()
}
