import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { FileEntity } from "src/entities/file/file.entity";
import { Repository } from "typeorm";

@Injectable()
export class UploadService {
    constructor(
        @InjectRepository(FileEntity)
        private readonly fileRepository: Repository<FileEntity>,
        private readonly configService: ConfigService,
    ){}

    /**
     *
     * @param filePath 文件路径
     * @param originName 原文件名
     * @returns
     */
    async addFile(filePath: string, originName: string) {
        const configPath = this.configService.get<string>('uploadAbsolutePath');
        const file = new FileEntity();
        file.filePath = filePath.replace(configPath, '');
        file.originName = decodeURI(originName);
        const res = await this.fileRepository.save(file);
        return res;
    }
}
