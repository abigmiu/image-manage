import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoginRequestLogin } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { AppLoggerService } from '../common/app-logger/app-logger.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService,
        private readonly appLoggerService: AppLoggerService
    ) { }

    async login(dto: LoginRequestLogin) {
        const foundData = await this.prismaService.user.findFirst({
            where: {
                account: dto.account,
                password: dto.password
            }
        })
        if (!foundData) {
            throw new BadRequestException('账号或密码错误');
        }

        const token = await this.generateToken(foundData.id);
        this.appLoggerService.info("登录成功");
        return {
            ...foundData,
            token,
        }
    }

    async generateToken(id: number) {
        const token = await this.jwtService.signAsync({
            id,
        })
        return token;
    }
}
