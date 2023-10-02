import { Type } from "class-transformer";
import { IsInt, IsOptional } from "class-validator";

export class CreateImageDto {
    /** 名称 */
    name?: string;
    /** 文件名称路径（相对路径） */
    filePath: string;
    /** 文件原 url */
    link?: string;
    /** 文件备注 */
    remark?: string;
    /** 标签id*/
    tagIds: number[];
    /** 缩略图路径 */
    coverFilePath?: string;
    /** 第三方云服务 */
    cloudValue?: Array<any>;

    width: number;
    height: number;
}

export class UpdateImageDto {
    name?: string;
    remark?: string;
    /** 文件原 url */
    link?: string;
    /** 标签id*/
    tagIds: number[];
}

export class ImageQueryDto {
    @IsOptional()
    @Type(() => Number)
    @IsInt({
        message: '$property 不合法，需要为整数'
    })
        page?: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt({
        message: '$property 不合法，需要为整数'
    })
        size?: number;
}
