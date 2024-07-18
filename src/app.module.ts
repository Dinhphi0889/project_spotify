import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { SongModule } from './song/song.module';
import { GenreModule } from './genre/genre.module';
import { MessagesModule } from './messages/messages.module';
import { RecentSongsModule } from './recent-songs/recent-songs.module';
import { LikeDsongsModule } from './likedsongs/like-dsongs.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './ResponseInterceptor';
import { DiscussModule } from './discuss/discuss.module';

@Module({
  imports: [UserModule, SongModule,
    ConfigModule.forRoot({ isGlobal: true }),
    GenreModule,
    MessagesModule,
    RecentSongsModule,
    LikeDsongsModule,
    DiscussModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor
    }
  ],
})
export class AppModule { }
