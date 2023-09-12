import { supplierService } from '@/services/supplier';
import type { ISingFileUploadRequest } from '@/types/apis/request/upload/upload';
import { ICloudUploadParamsResponse } from '@/types/apis/response/supplier/supplier';
import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';

export async function cloudUpload(file: File, query?:ISingFileUploadRequest,options?: AxiosRequestConfig) {
    const uploadParams = await supplierService.getUploadConfig();
    
    const formData = new FormData();
    formData.append(uploadParams.fileField, file);
    Object.keys(uploadParams.form).forEach(key => {
        formData.append(key, uploadParams.form[key]);
    });
    await axios.request({
        ...options,
        url: uploadParams.uploadUrl,
        method: uploadParams.method,
        data: formData,
        params: query,
        headers: uploadParams.headers,
    });

    return uploadParams.accessUrl;

}