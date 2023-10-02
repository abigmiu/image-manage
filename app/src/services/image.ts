import type { IPageResponse } from '@/types/apis/base';
import type { IImageUpdateDto } from '@/types/apis/request/image/image';
import type { IImageResponseItem } from '@/types/apis/response/image/image.response';
import http from '@/utils/axios';

class ImageService {
    private readonly prefix = 'image';

    createImage(data: any) {
        return http.request({
            url: this.prefix,
            method: 'post',
            data,
        });
    }

    getPageData(query: Record<string, any>) {
        return http.request<IPageResponse<IImageResponseItem>>({
            url: `${this.prefix}/page`,
            params: query,
        });
    }

    deleteImage(imageId: number) {
        return http.request({
            url: `${this.prefix}/${imageId}`,
            method: 'delete',
        });
    }

    updateImage(id: number, data: IImageUpdateDto) {
        return http.request({
            url:`${this.prefix}/${id}`,
            method: 'patch'
        });
    }
}

export const imageService = new ImageService();