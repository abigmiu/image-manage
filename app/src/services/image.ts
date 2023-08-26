import http from '@/utils/axios'

class ImageService {
    private readonly prefix = 'image'

    createImage(data: any) {
        http.request({
            url: this.prefix,
            method: 'post',
            data,
        })
    }
}

export const imageService = new ImageService()