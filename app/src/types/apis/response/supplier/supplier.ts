export interface ICloudUploadParamsResponse {
    /** 访问链接 */
    accessUrl: string;
    /** 上传渠道类型 */
    driver: string;
    /** 不同渠道类型要求的文件指定的 from-data-field */
    fileField: string;
    /** 不同渠道类型要求的表单参数 */
    form: Record<string, any>;
    /** 不同渠道类型要求携带的Header */
    headers: Record<string, any>;
    /** HTTP 请求类型:GET,PUT,POST */
    method: string;
    /** 上传接口api地址 */
    uploadUrl: string;
}