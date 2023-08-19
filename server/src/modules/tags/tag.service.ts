import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TagsEntity } from "src/entities/tags/tags.entity";
import { CreateTagsDto } from "src/transformObject/tags/dto/tags.dto";
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
}
