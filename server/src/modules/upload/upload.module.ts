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
import { ConfigModule, ConfigService } from "@nestjs/config";


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
        MulterModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            async useFactory(configService: ConfigService) {
                return {
                    storage: diskStorage({
                        destination(req, file, callback) {
                            const { dir } = req.query;

                            const configPath = configService.get<string>('uploadAbsolutePath');

                            let filePath = '';
                            if (typeof dir === 'string') {
                                filePath = `${dir}/${filePath}`;
                                filePath = join(configPath, filePath);
                                checkDirAndCreate(filePath);
                            } else {
                                filePath = join(configPath, filePath);
                            }


                            console.log('filePath', filePath);

                            callback(null, filePath);
                        },
                        filename(req, file, callback) {
                            return callback(null, `${v4()}&${decodeURI(file.originalname)}`);
                        }
                    })
                };
            }

        })
    ],
    controllers: [UploadController],
    providers: [UploadService]
})
export class UploadModule {}
