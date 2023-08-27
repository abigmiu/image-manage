import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FileEntity } from "src/entities/file/file.entity";
import { Repository } from "typeorm";

@Injectable()
export class UploadService {
    constructor(
        @InjectRepository(FileEntity)
        private readonly fileRepository: Repository<FileEntity>
    ){}

    /**
     *
     * @param filePath 文件路径
     * @param originName 原文件名
     * @returns
     */
    async addFile(filePath: string, originName: string) {
        const file = new FileEntity();
        file.filePath = filePath;
        file.originName = decodeURI(originName);
        const res = await this.fileRepository.save(file);
        return res;
    }
}
