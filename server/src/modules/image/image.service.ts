import { IMAGE_NOT_EXIT } from "@/constant/requestException.constant";
import { BadRequestException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { ImageEntity } from "src/entities/image/image.entity";
import { TagsEntity } from "src/entities/tags/tags.entity";
import { CreateImageDto, ImageQueryDto, UpdateImageDto } from "src/transformObject/image/dto/image.dto";
import { handlePageData } from "src/utils/pager";
import { Repository } from "typeorm";

@Injectable()
export class ImageService {
    constructor(
        @InjectRepository(ImageEntity)
        private readonly imageRepo: Repository<ImageEntity>,
        private readonly configService: ConfigService,
    ) { }

    /** 创建图片 */
    async createImage(data: CreateImageDto) {
        const image = new ImageEntity();
        image.filePath = data.filePath;
        if (data.name) {
            image.name = data.name;
        }
        if (data.link) {
            image.link = data.link;
        }
        if (data.remark) {
            image.remark = data.remark;
        }
        if (data.cloudValue) {
            image.cloudValue = data.cloudValue;
        }

        if (data.coverFilePath) {
            image.coverFilePath = data.coverFilePath;
        }

        image.width = data.width;
        image.height = data.height;

        image.tags = data.tagIds.map((tagId) => {
            const tag = new TagsEntity();
            tag.id = tagId;
            return tag;
        });

        await this.imageRepo.save(image);
    }

    async updateImage(id: number,data: UpdateImageDto) {
        const image = await this.imageRepo.findOne({
            where: {
                id,
                isDelete: false,
            }
        });
        if (!image) {
            throw new BadRequestException(IMAGE_NOT_EXIT);
        }

        if (data.remark) {
            image.remark = data.remark;
        }

        if (data.link) {
            image.link = data.link;
        }

        if (data.name) {
            image.name = data.name;
        }

        if (data.tagIds && data.tagIds.length) {
            image.tags = data.tagIds.map((tagId) => {
                const tag = new TagsEntity();
                tag.id = tagId;
                return tag;
            });
        }

        const res = await this.imageRepo.save(image);
        return res;
    }

    /** 删除图片 */
    async deleteImage(imageId: number) {
        const image = new ImageEntity();
        image.id = imageId;
        await this.imageRepo.update(image, {
            isDelete: true,
        });
    }

    /** 获取分页数据 */
    async getPageData(query: ImageQueryDto) {
        const { page = 1, size = 10 } = query;
        const res = await this.imageRepo.findAndCount({
            where: {
                isDelete: false,
            },
            take: size,
            skip: (page - 1) * size
        });
        console.log(res[0]);

        // const staticAssetsPath = this.configService.get<string>('staticAssetsPath');
        // res[0].forEach((item) => {
        //     item.filePath = `${staticAssetsPath}${item.filePath}`;
        //     if (item.coverFilePath) {
        //         item.coverFilePath = `${staticAssetsPath}${item.coverFilePath}`;
        //     }
        // });

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
