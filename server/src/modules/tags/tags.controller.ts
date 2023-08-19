import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { TagsService } from "./tag.service";
import { CreateTagsDto, UpdateTagsDto } from "src/transformObject/tags/dto/tags.dto";

/**  标签 controller */
@Controller('tags')
export class TagsController {
    constructor(
        private readonly tagsService: TagsService
    ) {}

    /** 获取标签列表 */
    @Get('list')
    getTagsList() {
        return this.tagsService.getTagsList();
    }

    /** 更新一个标签 */
    @Put(':id')
    async updateTag(@Param('id') id: string, @Body() body: UpdateTagsDto) {
        const isExit = await this.tagsService.isTagIsExit(Number(id));
        if (!isExit) {
            throw  new BadRequestException('标签不存在')
        }
        return this.tagsService.updateTag(Number(id), body);
    }

    @Delete(':id')
    async deleteTag(@Param('id') id: string) {
        const isExit = await this.tagsService.isTagIsExit(Number(id));
        if (!isExit) {
            throw  new BadRequestException('标签不存在')
        }
        return this.tagsService.deleteTag(Number(id));
    }

    /** 创建一个标签 */
    @Post()
    async createTag(@Body() body: CreateTagsDto) {

        const hasTagName = await this.tagsService.hasTagName(body.name);
        if (hasTagName) {
            throw  new BadRequestException('已有相同的标签名')
        }
        return this.tagsService.createTag(body)
    }
}
