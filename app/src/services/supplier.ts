import { ICloudUploadParamsResponse } from '@/types/apis/response/supplier/supplier';
import http from '@/utils/axios'

class SupplierService {
    getUploadConfig() {
        return http.request<ICloudUploadParamsResponse>({
            url: 'cloud-upload/qiniu'
        })
    }
}

export const supplierService = new SupplierService();