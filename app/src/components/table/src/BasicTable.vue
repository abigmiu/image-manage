<template>
    <div>
        <NDataTable ref="tableRef" v-bind="getBindValues" :remote="true">
            <template v-for="item in Object.keys($slots)" #[item]="data" :key="item">
                <slot :name="item" v-bind="data" />
            </template>
        </NDataTable>
    </div>
</template>
<script setup lang="ts">
import { TABLE_DEFAULT_PAGE, TABLE_DEFAULT_SIZE, TABLE_DEFAULT_SIZES } from '@/constant/app';
import type { PaginationProps, DataTableProps } from 'naive-ui';
import { NDataTable } from 'naive-ui';
import { computed, reactive, useAttrs } from 'vue';

interface Props extends /* @vue-ignore */ DataTableProps {
    itemCount: number;
}

const props = defineProps<Props>();
const attrs = useAttrs();
const emits = defineEmits<{
    'pagination-change': [data: { page: number, pageSize?: number }]
}>();

const pagination = reactive<PaginationProps>({
    page: TABLE_DEFAULT_PAGE,
    pageSize: TABLE_DEFAULT_SIZE,
    pageSizes: TABLE_DEFAULT_SIZES,
    onUpdatePage(page) {
        pagination.page = page;
        emits('pagination-change', { page });
    },
    onUpdatePageSize(pageSize) {
        pagination.pageSize = pageSize;
        pagination.page = 1;
        emits('pagination-change', { page: 1, pageSize });
    },
});

const getBindValues = computed(() => {
    return {
        ...props,
        ...attrs,
        pagination: {
            ...pagination,
            itemCount: props.itemCount
        }
    } as DataTableProps;
});
</script>