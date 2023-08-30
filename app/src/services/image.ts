import http from '@/utils/axios'

class ImageService {
    private readonly prefix = 'image'

    createImage(data: any) {
        return http.request({
            url: this.prefix,
            method: 'post',
            data,
        })
    }

    getPageData(query: Record<string, any>) {
        return http.request({
            url: `${this.prefix}/page`,
            params: query,
        })
    }

    deleteImage(imageId: number) {
        return http.request({
            url: `${this.prefix}/${imageId}`,
            method: 'delete',
        })
    }
}

export const imageService = new ImageService()