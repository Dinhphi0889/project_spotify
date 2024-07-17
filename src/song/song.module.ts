import { Module } from '@nestjs/common';
import { SongService } from './song.service';
import { SongController } from './song.controller';
import { LikeDsongsModule } from './like-dsongs/like-dsongs.module';

@Module({
  controllers: [SongController],
  providers: [SongService],
  imports: [LikeDsongsModule],
})
export class SongModule {}
