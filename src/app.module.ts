import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { SongModule } from './song/song.module';
import { GenreModule } from './genre/genre.module';
import { MessagesModule } from './messages/messages.module';
import { RecentSongsModule } from './recent-songs/recent-songs.module';

@Module({
  imports: [UserModule, SongModule,
    ConfigModule.forRoot({ isGlobal: true }),
    GenreModule,
    MessagesModule,
    RecentSongsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
