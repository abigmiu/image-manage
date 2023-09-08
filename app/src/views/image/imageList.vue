<template>
    <NCard>
        <BasicTable :columns="columns" :data="listData" :pagination="pagination" />

        <NDrawer v-model:show="detailVisible" :width="500">
            <NDrawerContent title="详情">
                <ImageDetail :source="detailData" />
            </NDrawerContent>
        </NDrawer>
    </NCard>
</template>
<script setup lang="ts">
import { BasicTable } from '@/components/table';
import { imageService } from '@/services/image';
import { NButton, NCard, NImage, useDialog, NDrawer, NDrawerContent, PaginationProps } from 'naive-ui';
import { h, onMounted, reactive, ref } from 'vue';

import ImageDetail from './components/ImageDetail.vue';

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

const pagination = reactive<PaginationProps>({
    page: 1,
    pageSize: 10,
    itemCount: 0
});

const query = {
    page: 1,
    size: 10
};

const listData = ref([]);
async function fetchData() {
    const res: any = await imageService.getPageData(query);
    listData.value = res.content;
    pagination.itemCount = res.pagination.total;
    pagination.page = res.pagination.page;
    pagination.pageSize = res.pagination.pageSize;
}

onMounted(() => fetchData());

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