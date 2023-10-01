export interface IApiResponse<T = any> {
    data: T;
    code: number;
    msg: string;
}

export interface IPagination {
    page: number;
        size: number;
        total: number;
}

export interface IPageResponse<T = any> {
    content: T[];
    pagination:IPagination
}