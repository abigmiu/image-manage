<template>
    <NCard>
        <BasicTable :columns="columns" :data="listData"></BasicTable>
    </NCard>
</template>
<script setup lang="ts">
import { BasicTable } from '@/components/table'
import { imageService } from '@/services/image';
import { NCard, NImage } from 'naive-ui'
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
    }
]

const listData = ref([])
async function fetchData() {
    const res: any = await imageService.getPageData();
    listData.value = res.content;
}

onMounted(() => fetchData())

</script>