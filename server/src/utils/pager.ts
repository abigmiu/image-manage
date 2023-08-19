export function handlePageData<T = any>([content, total]: [T[], number], page: number, size: number) {
    return {
        content,
        pagination: {
            page,
            size,
            total,
        }
    };
}
