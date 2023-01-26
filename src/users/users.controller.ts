import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";
import { CreateUserDto } from "./dtos/createUser.dto";
import { LoginUserDto } from "./dtos/loginUser.dto";
import { JwtGuard } from "./guard";
import { UsersService } from "./users.services";

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post('signup')
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto);
    }

    @Post('login')
    login(@Body() loginUserDto: LoginUserDto){
        return this.usersService.login(loginUserDto);
    }

    @UseGuards(JwtGuard)
    @Get()
    findAll(@Req() req: Request){
        return req.user;
    }
}