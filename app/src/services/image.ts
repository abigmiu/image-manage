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

    getPageData() {
        return http.request({
            url: `${this.prefix}/page`,
        })
    }
}

export const imageService = new ImageService()