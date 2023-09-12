import type { ITagsCreateRequest } from "../apis/request/tags/tags";
import type { ITagResponse } from "../apis/response/tags/tags";

export type ITags = ITagResponse
export type ITagsCreate = Omit<ITagsCreateRequest, 'colorType'> & {
    colorType: null | number
}