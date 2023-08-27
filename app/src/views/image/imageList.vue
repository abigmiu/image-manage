<template>
    <NCard>
        <BasicTable :columns="columns" :data="listData"></BasicTable>
    </NCard>
</template>
<script setup lang="ts">
import { BasicTable } from '@/components/table'
import { imageService } from '@/services/image';
import { NButton, NCard, NImage, useDialog } from 'naive-ui'
import { h, onMounted, ref } from 'vue';

const columns = [
    {
        title: 'id',
        key: 'id',
    },
    {
        title: '图片',
        key: 'coverFilePath',
        render(row: any) {
            return h(NImage, {
                src: row.coverFilePath || row.filePath
            })
        }
    },
    {
        title: '名称',
        key: 'name',
    }, 
    {
        title: '备注',
        key: 'remark',
    },
    {
        title: '操作',
        key: 'action',
        render(row: any) {
            return h(
                NButton,
                {
                    quaternary: true,
                    type: 'error',
                    onClick: () => onDelete(row)
                },
                {
                    default: () => '删除'
                }
            )
        }
    }
]

const listData = ref([])
async function fetchData() {
    const res: any = await imageService.getPageData();
    listData.value = res.content;
}

onMounted(() => fetchData())

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
    })
}
</script>