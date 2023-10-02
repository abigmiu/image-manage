import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { ImageService } from "./image.service";
import { CreateImageDto, ImageQueryDto, UpdateImageDto } from "src/transformObject/image/dto/image.dto";

@Controller('image')
export class ImageController {
    constructor(
        private readonly imageService: ImageService
    ) {}

    @Post()
    createImage(@Body() body: CreateImageDto) {
        return this.imageService.createImage(body);
    }

    @Patch(':id')
    updateImage(@Body() body: UpdateImageDto, @Param('id') id: string) {
        return this.imageService.updateImage(Number(id), body);
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
