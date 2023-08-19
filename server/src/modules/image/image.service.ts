import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ImageEntity } from "src/entities/image/image.entity";
import { TagsEntity } from "src/entities/tags/tags.entity";
import { CreateImageDto, ImageQueryDto } from "src/transformObject/image/dto/image.dto";
import { handlePageData } from "src/utils/pager";
import { Repository } from "typeorm";

@Injectable()
export class ImageService {
    constructor(
        @InjectRepository(ImageEntity)
        private readonly imageRepo: Repository<ImageEntity>
    ) {}

    /** 创建图片 */
    async createImage(data: CreateImageDto) {
        const image = new ImageEntity();
        image.filePath = data.filePath;
        image.fileId = data.fileId;
        if (data.name) {
            image.name = data.name;
        }
        if (data.link) {
            image.link = data.link;
        }
        if (data.remark) {
            image.remark = data.remark;
        }
        if (data.coverFilePath) {
            image.coverFilePath = data.coverFilePath;
        }
        if (data.cloudValue) {
            image.cloudValue = data.cloudValue;
        }

        image.tags = data.tagIds.map((tagId) => {
            const tag = new TagsEntity();
            tag.id = tagId;
            return tag;
        });

        await this.imageRepo.save(image);
    }

    /** 删除图片 */
    async deleteImage(imageId: number) {
        const image = new ImageEntity();
        image.id = imageId;
        await this.imageRepo.update(image, {
            isDelete: false,
        });
    }

    /** 获取分页数据 */
    async getPageData(query: ImageQueryDto) {
        const { page= 1, size= 10 } = query;
        const res = await this.imageRepo.findAndCount({
            where: {
                isDelete: false,
            },
            take: size,
            skip: (page - 1) * size
        });

        return handlePageData(res, page, size);
    }

    /**
     * 获取所有数据
     * @returns
     */
    async getList() {
        const res = await this.imageRepo.find({
            where: {
                isDelete: false,
            },
        });

        return res;
    }
}
