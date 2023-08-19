import { Module } from "@nestjs/common";
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from "multer";
import { v4 } from 'uuid';
import { extname } from 'path';
import { UploadController } from "./upload.controller";
import { UploadService } from "./upload.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FileEntity } from "src/entities/file/file.entity";

@Module({
    imports:[
        TypeOrmModule.forFeature([FileEntity]),
        MulterModule.register({
            storage: diskStorage({
                destination: `./upload`,
                filename (req, file, callback) {
                    const name = `${v4()}${extname(file.originalname)}`;
                    return callback(null, name);
                }
            })
        })
    ],
    controllers: [UploadController],
    providers: [UploadService]
})
export class UploadModule {}
