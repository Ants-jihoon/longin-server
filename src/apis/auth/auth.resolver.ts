import { Context, Resolver } from "@nestjs/graphql";
import { Mutation, Args } from "@nestjs/graphql"
import * as bcrypt from 'bcrypt';
import { UserService } from "../users/users.service";
import { AuthService } from "./auth.service";
import { UnprocessableEntityException } from '@nestjs/common/exceptions'
import { CurrentUser } from "src/commons/auth/gql-user.param";
import { emailTokenGuard } from "src/commons/auth/gql-auth.guard";
import { UseGuards } from '@nestjs/common'

@Resolver()
export class AuthResolver {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) { }

    @Mutation(() => String)
    async login(
        @Args('email') email: string,
        @Args('psword') psword: string,
        @Context() context: any,
    ) {
        const user = await this.userService.findOne({ email })
        if (!user) {
            throw new UnprocessableEntityException('이메일이 존재하지 않습니다.')
        }
        const isAuth = await bcrypt.compare(psword, user.psword)
        if (!isAuth) {
            throw new UnprocessableEntityException('암호가 틀렸습니다.')
        }

        this.authService.getRefreshToken({ user, res: context.req.res })

        return this.authService.getAccessToken({ user })


    }

    @Mutation(() => String)
    async sendEmail(
        @Args('email') email: string,
        @Context() context: any,
    ) {
        const eToken = await this.authService.emailCode()
        const test = await this.authService.sendCode({ email, eToken, res: context.req.res })
        console.log(test.authNum)
        return test.result

    }


    @UseGuards(emailTokenGuard)
    @Mutation(() => String)
    async checkEmail(
        @CurrentUser() currentUser: any
    ) {
        console.log(currentUser)
        return true
    }


}