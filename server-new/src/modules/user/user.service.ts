import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { RegisterRequestDto, RegisterResponseDto } from './dto/register.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { transformResponse } from 'src/utils';

@Injectable()
export class UserService {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly logger: Logger,
        private readonly prismaService: PrismaService
    ) {}
    /** 检查是否存在同名昵称 */
    async checkNickNameUnique(nickname: string) {
        const foundData = await this.prismaService.user.findFirst({
            where: {
                nickname: nickname
            }
        })
        if (foundData) {
            throw new BadRequestException('昵称重复');
        }
    }

    async checkAccountUnique(account: string) {
        const foundData = await this.prismaService.user.findFirst({
            where: {
                account: account
            }
        })
        if (foundData) {
            throw new BadRequestException('账号重复');
        }
    }

    /** 注册 */
    async register(dto: RegisterRequestDto) {
        this.logger.info(JSON.stringify(dto));
        await this.checkAccountUnique(dto.account);
        await this.checkNickNameUnique(dto.nickname);

        const savedData = await this.prismaService.user.create({
            data: {
                account: dto.account,
                nickname: dto.nickname,
                avatar: dto.avatar,
                password: dto.password,
            }
        });

        return transformResponse(RegisterResponseDto, savedData);
    }
}
