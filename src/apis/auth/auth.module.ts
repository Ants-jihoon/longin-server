import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ETokenStrategy } from "src/commons/auth/eToken.strategy";
import { JwtRefreshStrategy } from "src/commons/auth/jwt-refresh.strategy";
import { JwtGoogleStrategy } from "src/commons/auth/jwt-social-google.strategy copy";
import { User } from "../users/entities/users.entity";
import { UserService } from "../users/users.service";
import { AuthController } from "./auth.controller";
import { AuthResolver } from "./auth.resolver";
import { AuthService } from "./auth.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.register({

        })
    ],
    providers: [
        AuthResolver,
        AuthService,
        UserService,
        ETokenStrategy,
        JwtRefreshStrategy,
        JwtGoogleStrategy,
    ],
    controllers: [
        AuthController,
    ]
})
export class AuthModule { }