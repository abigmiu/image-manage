import type { ITagsCreateRequest } from '@/types/apis/request/tags/tags';
import type { ITagResponse } from '@/types/apis/response/tags/tags';
import http from '@/utils/axios';

class TagsService {
    private readonly prefix = 'tags';

    /**
     * 删除标签
     * @param tagId 标签 id
     * @returns 
     */
    deleteTag(tagId: number) {
        return http.request({
            url: `${this.prefix}/${tagId}`,
            method: 'delete',
        });
    }

    /**
     * 新增标签
     * @param data 
     * @returns 
     */
    createTag(data: ITagsCreateRequest) {
        return http.request<ITagResponse>({
            url: this.prefix,
            method: 'post',
            data,
        });
    } 

    /**
     * 获取标签列表
     * @returns 
     */
    getList() {
        return http.request<ITagResponse[]>({
            url: `${this.prefix}/list`
        });
    }
}

export const tagService = new TagsService();