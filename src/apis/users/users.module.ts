import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtAccessStrategy } from "src/commons/auth/jwt-access.strategy";
import { User } from "./entities/users.entity";
import { UserResolver } from "./users.resolver";
import { UserService } from "./users.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([User])
    ],
    providers: [
        JwtAccessStrategy,
        UserResolver,
        UserService,
    ],
})
export class UserModule { }