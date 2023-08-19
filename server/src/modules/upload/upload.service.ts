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

    async addFile(fileName: string) {
        const file = new FileEntity();
        file.fileName = fileName
        await this.fileRepository.save(file)
    }
}
