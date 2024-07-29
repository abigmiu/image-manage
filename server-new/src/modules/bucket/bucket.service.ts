import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBucketDto } from './dto/create-bucket.dto';

@Injectable()
export class BucketService {
    constructor(
        private readonly prismaService: PrismaService,
    ) {}


    async create(dto: CreateBucketDto) {
        const res = await this.prismaService.bucket.create({
            data: {
                name: dto.name,
                type: dto.type,
                config: JSON.stringify(dto.config),
                remark: dto.remark,
            }
        })

        return res;
    }

    async getList() {
        const res = await this.prismaService.bucket.findMany({
            where: {
                isDelete: false,
            }
        })

        return res;
    }
}
