import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from "multer";
import { extname, join } from 'path';
import { v4 } from 'uuid';
@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination(req, file, callback) {
          callback(null, join(process.cwd(), 'upload'))
        },
        filename(req, file, callback) {
          const filename = `${v4()}${extname(file.originalname)}`;
          return callback(null, filename);
      }
      })
    })
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
