import { MailerService } from "@nestjs-modules/mailer/dist";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt/dist";
import 'dotenv/config';



@Injectable()
export class AuthService {
    constructor(
        private readonly mailerService: MailerService,
        private readonly jwtService: JwtService,
    ) { }

    async emailCode() {
        const mycount = 6
        const result = await String(Math.floor(Math.random() * 10 ** mycount)).padStart(mycount, "0")
        return result
    }

    async sendCode({ email, eToken, res }) {
        try {
            await this.mailerService.sendMail({
                to: email,
                from: 'wlgnstls0413@naver.com',
                subject: '이메일 인증 요청 메일입니다.',
                html: '6자리 인증 코드 : ' + `<b> ${eToken}</b>`,
            });

            const hashedeToken = this.jwtService.sign(
                { email: email, sub: eToken },
                { secret: "myETokenKey", expiresIn: '2m' }
            );

            res.setHeader('Set-Cookie', `emailCode=${hashedeToken}`)

            return { result: true, authNum: hashedeToken }
        } catch (err) {
            return { result: false }
        }
    }


    getAccessToken({ user }) {
        return this.jwtService.sign(
            { email: user.email, sub: user.nickname },
            { secret: "myAccessKey", expiresIn: '1h' },
        );
    }

    getRefreshToken({ user, res }) {
        const refreshToken = this.jwtService.sign(
            { email: user.email, sub: user.nickname },
            { secret: "myRefreshKey", expiresIn: '2w' },
        );

        res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; path=/;`)

        // 배포환경
        // res.setHeader('Access-Control-Allow-Origin', 'https://myfrontsite.com')
        // res.setHeader(
        //   'Set-Cookie',
        //   `refreshToken=${refreshToken}; path=/; domain=.mybacksite.com; SameSite=None; Secure; httpOnly;`
        // )

    }


}
