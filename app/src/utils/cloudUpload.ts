import { supplierService } from '@/services/supplier';
import { ICloudUploadParamsResponse } from '@/types/apis/response/supplier/supplier';
import axios, { AxiosRequestConfig } from 'axios';

export async function cloudUpload(file: File, options?: AxiosRequestConfig) {
    const uploadParams = await supplierService.getUploadConfig();
    
    const formData = new FormData();
    formData.append(uploadParams.fileField, file);
    Object.keys(uploadParams.form).forEach(key => {
        formData.append(key, uploadParams.form[key]);
    })
    await axios.request({
        ...options,
        url: uploadParams.uploadUrl,
        method: uploadParams.method,
        data: formData,
        headers: uploadParams.headers,
    })

    return 

}