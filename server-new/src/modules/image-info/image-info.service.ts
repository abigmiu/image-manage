import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ImageInfoCreateRequest } from './dto/image-info.create';
import { dot } from 'node:test/reporters';

@Injectable()
export class ImageInfoService {
    constructor(
        private readonly prismaService: PrismaService
    ) {}

    async create(dto: ImageInfoCreateRequest) {
        const res = await this.prismaService.image.create({
            data: {
                originFile: {
                    connect: {
                        id: dto.originId,
                    }
                },
                name: dto.name,
                thumbFile: {
                    connect: {
                        id: dto.thumbId,
                    }
                },
            },
            include: {
                originFile: true,
                thumbFile: true,
            }
        })
        return res;
    }

    async batchCreate(dto: ImageInfoCreateRequest[]) {
        const result = []
        for (let i = 0; i < dto.length; i++) {
            const res = await this.create(dto[i]);
            result.push(res);
        }

        return result;
    }
}
