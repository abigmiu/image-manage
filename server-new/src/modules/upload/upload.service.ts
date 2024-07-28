import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UploadService {
    constructor(
        private readonly prismaService: PrismaService,
    ) {}
    async addFile(formData: {
        thumb: Express.Multer.File[],
        origin: Express.Multer.File[]
      }, body: {
        thumbWidth: number,
        
          thumbHeight: number,
          originWidth: number,
          originHeight: number,
      }) {
        const { thumb, origin}  = formData;
        if (!thumb.length) {
            throw new Error('缩略图未上传')
        }
        if (!origin.length) {
            throw new Error('原图未上传')
        }

        const thumbFile = thumb[0];
        const originFile = origin[0];

        const thumbFileResult = await this.prismaService.file.create({
            data: 
                {
                    filePath: thumbFile.filename,
                    originName: thumbFile.originalname,
                    width: +body.thumbWidth,
                    height: +body.thumbHeight,
                    size: thumbFile.size,
                    mimetype: 1
                },   
        })
        const originFileResult = await this.prismaService.file.create({
            data: 
                {
                    filePath: originFile.filename,
                    originName: originFile.originalname,
                    width: +body.originWidth,
                    height: +body.originHeight,
                    size: originFile.size,
                    mimetype: 1
                },   
        })

        return {
            thumb: thumbFileResult,
            origin: originFileResult
        };
    }
}
