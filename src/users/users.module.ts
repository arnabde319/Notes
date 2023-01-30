import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtStrategy } from "./strategy";
import { User } from "./user.entity";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.services";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.register({})
    ],
    providers: [UsersService,JwtStrategy],
    controllers: [UsersController],
    exports: [UsersService,JwtModule,TypeOrmModule]
})
export class UsersModule {}