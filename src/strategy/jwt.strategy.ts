import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportSerializer, PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStategy extends PassportStrategy(Strategy, "Check-token"){
    constructor(config: ConfigService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpriration: false,
        })
    }

    async validateToken(tokenCode){
        return tokenCode
    }
}