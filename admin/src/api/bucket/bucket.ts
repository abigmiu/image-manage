import { http } from '@/utils/http/axios';

export function createBucket(data) {
  return http.request(
    {
      url: '/bucket',
      method: 'post',
      data,
    },
    {
      isTransformResponse: false,
    }
  );
}

export function getBucketTableList() {
  return http.request({
    url: '/bucket/list',
    method: 'get',
  });
}
