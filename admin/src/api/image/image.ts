import { http } from '@/utils/http/axios';

interface ICreateImageInfo {
  originId: number;
  thumbId: number;
  name: string;
}

export function createImageInfo(data: ICreateImageInfo) {
  return http.request(
    {
      url: '/image-info',
      method: 'post',
      data,
    },
    {
      isTransformResponse: false,
    }
  );
}
