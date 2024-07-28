import { Module } from '@nestjs/common';
import { ImageInfoService } from './image-info.service';
import { ImageInfoController } from './image-info.controller';

@Module({
  controllers: [ImageInfoController],
  providers: [ImageInfoService],
})
export class ImageInfoModule {}
