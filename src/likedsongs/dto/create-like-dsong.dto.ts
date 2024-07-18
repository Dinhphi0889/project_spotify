import { IsNumber } from "class-validator";

export class LikeDsongDto {
    @IsNumber()
    idUser: number;

    @IsNumber()
    idSongLiked: number;
    
}
