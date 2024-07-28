import { Body, Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) { }

  @Post()
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'thumb', maxCount: 1 },
    { name: 'origin', maxCount: 1 }
  ]))
  async uploadFile(@UploadedFiles() formData: {
    thumb: Express.Multer.File[],
    origin: Express.Multer.File[],
  }, @Body() body: any) {
   console.log("🚀 ~ UploadController ~ uploadFile ~ body:", body);
   return this.uploadService.addFile(formData, body);

  }
}
