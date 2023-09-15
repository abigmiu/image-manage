<template>
    <NCard>
        <BasicTable
            :loading="loading"
            :columns="columns"
            :data="tableData"
            :item-count="pagination.total"
            @pagination-change="onPaginationChange"
        />

        <NDrawer v-model:show="detailVisible" :width="500">
            <NDrawerContent title="详情">
                <ImageDetail :source="detailData" />
            </NDrawerContent>
        </NDrawer>
    </NCard>
</template>
<script setup lang="ts">
import type    {IImageResponseItem} from '@/types/apis/response/image/image.response.ts';
import { BasicTable } from '@/components/table';
import { imageService } from '@/services/image';
import { NButton, NCard, NImage, useDialog, NDrawer, NDrawerContent, PaginationProps } from 'naive-ui';
import { h, onMounted, reactive, ref } from 'vue';

import ImageDetail from './components/ImageDetail.vue';
import { useTableHook } from '@/hooks/tableHook';

const columns = [
    {
        title: 'id',
        key: 'id',
        width: 80,
    },
    {
        title: '图片',
        key: 'coverFilePath',
        width: 200,
        render(row: any) {
            return h(NImage, {
                src: row.coverFilePath || row.filePath,
                previewSrc: row.filePath,
                height: 100,
                'object-fit': 'cover',
            });
        }
    },
    {
        title: '名称',
        key: 'name',
        width: 300,
    },
    {
        title: '备注',
        key: 'remark',
        
    },
    {
        title: '操作',
        key: 'action',
        width: 200,
        render(row: any) {
            return h('div', [
                h(
                    NButton,
                    {
                        quaternary: true,
                        type: 'info',
                        onClick: () => onDetailBtn(row),
                    },
                    {
                        default: () => '详情',
                    }
                ),
                h(
                    NButton,
                    {
                        quaternary: true,
                        type: 'error',
                        onClick: () => onDelete(row)
                    },
                    {
                        default: () => '删除'
                    }
                ),

            ]);
        }
    }
];

const itemCount = ref(0);

const query: Record<string, any> = {
    page: 1,
    size: 10
};

const listData = ref([]);
async function fetchData() {
    const res: any = await imageService.getPageData(query);
    listData.value = res.content;
    itemCount.value = res.pagination.total;
}
onMounted(() => fetchData());

const { loading, tableData, fetchTableData, pagination } = useTableHook(imageService.getPageData.bind(imageService), query);

function onPaginationChange(data: { page: number, pageSize?: number  }) {
    query.page = data.page;
    if (data.pageSize) {
        query.size = data.pageSize;
    }
    fetchTableData();
}

const dialog = useDialog();
async function onDelete(row: any) {
    const dialogInstance = dialog.warning({
        title: '删除',
        content: `确定删除文件“${row.name}”？`,
        positiveText: '删除',
        negativeText: '取消',
        onPositiveClick: async () => {
            dialogInstance.loading = true;
            await imageService.deleteImage(row.id);
        }
    });
}


// 详情相关
const detailData = reactive({});
const detailVisible = ref(false);
function onDetailBtn(row: Record<string, any>) {
    Object.assign(detailData, row);
    detailVisible.value = true;
}
</script>