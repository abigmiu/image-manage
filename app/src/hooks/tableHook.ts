import { onMounted, ref, shallowRef } from "vue";

export function useTableHook<T, Q>(params?: Reactive<Q>) {
    const loading = ref(false);
    const tableData = shallowRef<T[]>([]);

    function fetchTableData() {
        try {
            loading.value = true;
        } finally {
            loading.value = false;
        }
    }
    onMounted(() => fetchTableData());

    return {
        loading,
        tableData,
    };
}