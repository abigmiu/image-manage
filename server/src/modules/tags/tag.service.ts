import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TagsEntity } from "src/entities/tags/tags.entity";
import { CreateTagsDto, UpdateTagsDto } from "src/transformObject/tags/dto/tags.dto";
import { Repository } from "typeorm";

/* 标签 services */
@Injectable()
export class TagsService {
    constructor(
        @InjectRepository(TagsEntity)
        private readonly tagsRepository: Repository<TagsEntity>
    ) {}

    /* 获取标签列表 */
    async getTagsList() {
        const res = await this.tagsRepository.find({
            where: {
                isDelete: false,
            }
        })
        return res;
    }

    /**
     * 当前标签是否存在
     * @param tagId 标签 Id
     * @returns
     */
    async isTagIsExit(tagId: number) {
        const res = await this.tagsRepository.findOne({
            where: {
                id: tagId,
                isDelete: false
            }
        })
        console.log("🚀 ~ TagsService ~ isTagIsExit ~ res:", res);

        return Boolean(res)
    }

    /** 是否已经有当前标签名
     * @param tagName 标签名
     * @description 不计算已经删除的
     */
    async hasTagName(tagName: string) {
        const res = await this.tagsRepository.findOne({
            where: {
                name: tagName,
                isDelete: false,
            }
        })

        return Boolean(res);
    }

    /* 创建标签 */
    async createTag(data: CreateTagsDto) {
        const tag = new TagsEntity()
        tag.colorType = data.colorType;
        tag.name = data.name;
        const tagDetail = await this.tagsRepository.save(tag);
        return tagDetail;
    }

    /** 更新标签 */
    async updateTag(tagId: number, data: UpdateTagsDto) {
        const tag = new TagsEntity();
        tag.id = tagId;
        await this.tagsRepository.update(tag, data);
    }

    /** 删除标签 */
    async deleteTag(tagId: number) {
        const tag = new TagsEntity();
        tag.id = tagId;
        await this.tagsRepository.update(tag, { isDelete: true });
    }
}
