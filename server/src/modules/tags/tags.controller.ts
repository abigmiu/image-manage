import { BadRequestException, Body, Controller, Get, Post } from "@nestjs/common";
import { TagsService } from "./tag.service";
import { CreateTagsDto } from "src/transformObject/tags/dto/tags.dto";

/* 标签 controller */
@Controller('tags')
export class TagsController {
    constructor(
        private readonly tagsService: TagsService
    ) {}

    /* 获取标签列表 */
    @Get('list')
    getTagsList() {
        return this.tagsService.getTagsList();
    }

    /* 创建一个标签 */
    @Post()
    async createTag(@Body() body: CreateTagsDto) {
        const hasTagName = await this.tagsService.hasTagName(body.name);
        if (hasTagName) {
            throw  new BadRequestException('已有相同的标签名')
        }
        return this.tagsService.createTag(body)
    }
}
