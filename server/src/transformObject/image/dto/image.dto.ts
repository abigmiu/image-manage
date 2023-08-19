export class CreateImageDto {
    /** 名称 */
    name?: string;
    /** 文件Id */
    fileId: number;
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
    cloudValue?: string;
}

export class ImageQueryDto {
    page?: number;
    size?: number;
}
