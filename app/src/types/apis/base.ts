export interface IApiResponse<T = any> {
    data: T;
    code: string;
    msg: string;
}