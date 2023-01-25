import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'

export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
    constructor() {
        super({
            jwtFromRequest: (req) => {
                const cookie = req.headers.cookie;
                // console.log(cookie)
                // const cookies = cookie.replace(" ", "").split(";")
                // for (let i = 0; i < cookies.length; i++) {

                //     console.log(cookies[i])
                //     cookies[i].split("=")
                //     for (let j = 0; j < cookie[i]; j++) {
                //         console.log(cookies[i][j])

                //     }
                // }

                //====================================================================

                const refreshToken = cookie.replace("refreshToken=", "")
                return refreshToken
            },
            secretOrKey: "myRefreshKey",
        });
    }

    validate(payload) {
        console.log(payload)
        return {
            email: payload.email,
            nickname: payload.sub,
        }
    }
}