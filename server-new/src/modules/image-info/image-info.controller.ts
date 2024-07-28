import { Body, Controller, Post } from '@nestjs/common';
import { ImageInfoService } from './image-info.service';
import { ImageInfoCreateRequest } from './dto/image-info.create';

@Controller('image-info')
export class ImageInfoController {
  constructor(private readonly imageInfoService: ImageInfoService) {}

  @Post()
  createImageInfo(@Body() dto: ImageInfoCreateRequest) {
    return this.imageInfoService.create(dto);
  }

  @Post('batch')
  batchCreateImageInfo(@Body() dto: ImageInfoCreateRequest[]) {
    return this.imageInfoService.batchCreate(dto);
  }

}
