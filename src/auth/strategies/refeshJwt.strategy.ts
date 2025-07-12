import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import refeshJwtConfig from "src/config/refeshJwt.config";

import { AuthJwtPayload } from "src/types/jwtPayload.type";

@Injectable()
export class RefeshJwtStrategy extends PassportStrategy(Strategy, 'refesh-jwt') {
    constructor(@Inject(refeshJwtConfig.KEY) private refeshJwtConfiguration : ConfigType<typeof refeshJwtConfig>){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false, // Không bỏ qua thời gian hết hạn 
            secretOrKey: refeshJwtConfiguration.secret!, //! là để không bị lỗi undefined đảm bảo rằng secret đã được cung cấp
        })
    }
    validate(payload : AuthJwtPayload){
        return {userId: payload.sub}
    }
}