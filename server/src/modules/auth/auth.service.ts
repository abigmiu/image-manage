import { USER_NO_EXIT, USER_PASSWORD_ERROR } from "@/constant/requestException.constant";
import { UserEntity } from "@/entities/user/user.entity";
import { ILoginRequest } from "@/transformObject/auth/login.dto";
import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepo: Repository<UserEntity>,
        private readonly jwtService: JwtService,

    ) {

    }

    createToken(data: any){
        const token = this.jwtService.sign(data);
        return token;
    }

    validate(token?: string) {
        if (!token) {
            throw new UnauthorizedException();
        }

        return true;
    }

    async login(data: ILoginRequest) {
        const user = await this.userRepo.findOne({
            where: {
                account: data.account,
                isDelete: false,
            },
        });


        console.log(data, user);

        if (!user) {
            throw new BadRequestException(USER_NO_EXIT);
        }

        if (user.password !== data.password) {
            throw new BadRequestException(USER_PASSWORD_ERROR);
        }

        return {
            ...user,
            token: this.createToken({ id: user.id })
        };
    }
}
