import { http } from '@/utils/http/axios';
import { AxiosRequestConfig } from 'axios';

interface IImageWithThumbExtraInfo {
  thumbWidth: number;
  thumbHeight: number;
  originWidth: number;
  originHeight: number;
}

export function uploadImageWithThumb(
  file: File,
  thumb: File,
  otherInfo: IImageWithThumbExtraInfo,
  options: AxiosRequestConfig = {}
) {
  return http.uploadFile(
    {
      ...options,
      url: '/api/upload',
    },
    {
      file,
      name: 'origin',
      data: {
        thumb,
        ...otherInfo,
      },
    }
  );
}

interface ICreateUploadAsyncTask {
  imageId: number;
  bucketIds: number[];
}
export function createUploadAsyncTask(data: ICreateUploadAsyncTask) {
  return http.request(
    {
      url: '/upload/task',
      method: 'post',
      data,
    },
    {
      isTransformResponse: false,
    }
  );
}
