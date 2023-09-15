import { TABLE_DEFAULT_PAGE, TABLE_DEFAULT_SIZE } from "@/constant/app";
import type { IPageResponse, IPagination } from "@/types/apis/base";
import { onMounted, reactive, ref, shallowRef } from "vue";

type IRequestFn<T, Q> = (query: Q) => Promise<IPageResponse<T>>;


export function useTableHook<T, Q>(requestFn: IRequestFn<T, Q>, params: Q) {
    const loading = ref(false);
    const tableData = shallowRef<T[]>([]);
    const pagination = reactive<IPagination>({
        page: TABLE_DEFAULT_PAGE,
        size: TABLE_DEFAULT_SIZE,
        total: 0,
    });

    async function fetchTableData() {
        try {
            loading.value = true;
            const res = await requestFn(params);
            tableData.value = res.content;
            Object.assign(pagination, res.pagination);
        } finally {
            loading.value = false;
        }
    }
    onMounted(() => fetchTableData());

    return {
        loading,
        tableData,
        pagination,
        fetchTableData,
    };
}