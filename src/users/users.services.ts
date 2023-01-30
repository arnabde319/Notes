import { BadRequestException, ForbiddenException, Injectable, UseFilters } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { QueryFailedError, Repository, TypeORMError } from "typeorm";
import { CreateUserDto } from "./dtos/createUser.dto";
import { LoginUserDto } from "./dtos/loginUser.dto";
import { User } from "./user.entity";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>, private jwt: JwtService,private config: ConfigService){}

    async createUser(createUserDto: CreateUserDto){
        // return createUserDto;
        try{
            const user = this.userRepository.create(createUserDto);
            user.notes=[];
            const res = await this.userRepository.save(user);
            return this.signToken(res.id,res.email);
        }catch(error){
            if(error.code === 'ER_DUP_ENTRY'){
                throw new ForbiddenException('User already exist');
            }
            throw error;
        }
    }

    async login(loginUserDto: LoginUserDto){
        const user = await this.userRepository.findOneBy({email: loginUserDto.email});
        if(!user){
            throw new ForbiddenException('Email or Password incorrect');
        }
        const pwmatch = (loginUserDto.password === user.password);

        if(!pwmatch){
            throw new ForbiddenException('Email or password incorrect');
        }
        return this.signToken(user.id,user.email);
    }

    async signToken(userId: number, email: string){
        const payload = {
            sub: userId,
            email
        }
        const token = await this.jwt.sign(payload,{
            expiresIn: '15m',
            secret: this.config.get('JWT_SECRET')
        })
        return {
            access_token: token
        }
    }
    async getUser(user){
        const findUser = await this.userRepository.find({
            where:{
                id: user.id
            },
            relations:{
                notes: true
            }
        });
        if(!findUser){
            throw new BadRequestException('No user found');
        }
        const {password,...res}=findUser[0];
        return res;
    }
}