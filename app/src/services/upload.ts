import { ISingFileUploadRequest } from "@/types/apis/request/upload/upload";
import http from '@/utils/axios';

class UploadService {
    private readonly prefix = 'upload'

    /**
     * 上传单个文件
     * @param file 文件
     * @param config 文件配置
     * @returns 
     */
    uploadSingleFile(file: File, config?: ISingFileUploadRequest) {
        const formData = new FormData;
        formData.append('file', file);
        return http.request<string>({
            url: this.prefix,
            method: 'post',
            params: config,
            data: formData,
        })
    }
}

export const uploadService = new UploadService();