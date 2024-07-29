import { Body, Controller, Get, Post } from '@nestjs/common';
import { BucketService } from './bucket.service';
import { CreateBucketDto } from './dto/create-bucket.dto';

@Controller('bucket')
export class BucketController {
  constructor(private readonly bucketService: BucketService) {}

  @Post()
  createBucket(@Body() dto: CreateBucketDto) {
    return this.bucketService.create(dto);
  }

  @Get('list')
  getList() {
    return this.bucketService.getList();
  }
}
