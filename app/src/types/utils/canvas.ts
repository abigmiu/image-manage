export type IThumbnailOption = {
    /** 默认压缩到的宽度 */
    defaultCompressedWidth?: number;
    /** 指定宽度 */
    width?: number;
    /** 指定高度 */
    height?: number;
    /** 导出类型 */
    exportType?: 'jpeg' | 'png';
} 