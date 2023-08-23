import { Module } from "@nestjs/common";
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from "multer";
import { v4 } from 'uuid';
import { UploadController } from "./upload.controller";
import { UploadService } from "./upload.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FileEntity } from "src/entities/file/file.entity";
import { existsSync, mkdirSync } from 'fs';
import { sep, join} from 'path';


function checkDirAndCreate(filepath: string) {
    filepath
        .split(sep)
        .reduce((prevPath: string, folder) => {
            const currentPath = join(prevPath, folder, sep);
            if (!existsSync(currentPath)){
                mkdirSync(currentPath);
            }
            return currentPath;
        }, '');
}

@Module({
    imports:[
        TypeOrmModule.forFeature([FileEntity]),
        MulterModule.register({
            storage: diskStorage({
                destination(req, file, callback) {
                    const { dir } = req.query;

                    let filePath = '';
                    if (typeof dir === 'string') {
                        filePath = `${dir}/${filePath}`;
                    }

                    filePath = join('./upload', filePath);
                    console.log(filePath);
                    checkDirAndCreate(filePath);
                    callback(null, filePath);
                },
                filename(req, file, callback) {
                    return callback(null, `${v4()}&${file.originalname}`);
                }
            })
        })
    ],
    controllers: [UploadController],
    providers: [UploadService]
})
export class UploadModule {}
