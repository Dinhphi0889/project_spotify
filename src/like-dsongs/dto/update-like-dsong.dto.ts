import { PartialType } from '@nestjs/swagger';
import { CreateLikeDsongDto } from './create-like-dsong.dto';

export class UpdateLikeDsongDto extends PartialType(CreateLikeDsongDto) {}
