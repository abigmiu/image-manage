import { IThumbnailOption } from "@/types/utils/canvas";

/**
 * 生成图片的缩略图
 * @param imageSrc 图片地址
 */
export function createImageThumbnail(imageSrc: string, options: IThumbnailOption = {}): Promise<Blob> {
    const image = new Image();
    const canvas = document.createElement('canvas');
    const canvasCtx = canvas.getContext('2d');
    const { defaultCompressedWidth = 300, exportType = 'jpeg', width, height } = options;

    return new Promise((resolve, reject) => {
        image.onload = function imageOnLoad() {


            if (width && height) {
                canvas.width = width;
                canvas.height = height;
            } else {
                const ratio = defaultCompressedWidth / image.width;
                const defaultCompressedHeight = ratio * image.height;
                console.log(image.width, image.height, ratio);
                console.log('defaultCompressedHeight', defaultCompressedHeight)
                canvas.width = Math.ceil(defaultCompressedWidth);
                canvas.height = Math.ceil(defaultCompressedHeight)
            }

            canvasCtx?.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);
            canvas.toBlob((blob) => {
                if (!blob) {
                    reject()
                } else {
                    resolve(blob);
                }

            }, `image/${exportType}`);
        }
        image.src = imageSrc
    })
}