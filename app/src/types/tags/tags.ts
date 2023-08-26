import { ITagsCreateRequest } from "../apis/request/tags/tags";
import { ITagResponse } from "../apis/response/tags/tags";

export type ITags = ITagResponse
export type ITagsCreate = Omit<ITagsCreateRequest, 'colorType'> & {
    colorType: null | number
}