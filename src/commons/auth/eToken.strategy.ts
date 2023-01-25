import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'

export class ETokenStrategy extends PassportStrategy(Strategy, 'eToken') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: "myETokenKey",
        });
    }

    validate(payload) {
        console.log(payload)
        return {
            email: payload.email,
            eToken: payload.sub,
        }
    }
}