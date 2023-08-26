import { Body, Controller, Delete, Get, Param, Post, Query } from "@nestjs/common";
import { ImageService } from "./image.service";
import { CreateImageDto, ImageQueryDto } from "src/transformObject/image/dto/image.dto";

@Controller('image')
export class ImageController {
    constructor(
        private readonly imageService: ImageService
    ) {}

    @Post()
    createImage(@Body() body: CreateImageDto) {
        return this.imageService.createImage(body);
    }

    @Delete(':id')
    deleteImage(@Param('id') id: string) {
        return this.imageService.deleteImage(Number(id));
    }

    /** 获取分页数据 */
    @Get('page')
    getPageData(@Query() query: ImageQueryDto) {
        return this.imageService.getPageData(query);
    }

    @Get('list')
    getListData() {
        return this.imageService.getList();
    }
}
