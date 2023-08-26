<template>
    <NCard>
        <DragFile @change="onFileChange"></DragFile>
        <NForm>
            <NFormItem label="文件名称">
                <NInput v-model:value="editData.name"></NInput>
            </NFormItem>
            <NFormItem label="文件备注">
                <NInput v-model:value="editData.remark"></NInput>
            </NFormItem>
            <NFormItem label="文件原链接">
                <NInput type="textarea" v-model:value="editData.link"></NInput>
            </NFormItem>
            <NFormItem>
                <TagSelect v-model="editData.tagIds"></TagSelect>
            </NFormItem>
            <NFormItem>
                <NButton @click="onSubmit">确认</NButton>
            </NFormItem>
        </NForm>
    </NCard>
</template>
<script setup lang="ts">
import { NCard, NForm, NInput, NFormItem, NButton } from 'naive-ui'
import DragFile from './components/DragFile.vue';
import TagSelect from './components/TagSelect.vue';

import { uploadService } from '@/services/upload';
import { createImageThumbnail } from '@/utils/canvas';
import { blobToFile } from '@/utils/file';
import { reactive } from 'vue';
import { tagService } from '@/services/tags';
import { imageService } from '@/services/image';

const editData = reactive({
    tagIds: [],
    name: '',
    filePath: '',
    link: '',
    remark: '',
    coverFilePath: '',
    cloudValue: [],
})


async function uploadThumbnail(file: File) {
    const blob = window.URL.createObjectURL(file);
    let thumbnailBlob: Blob | null = await createImageThumbnail(blob);
    try {

        const res = await uploadService.uploadSingleFile(
            blobToFile(thumbnailBlob, `thumbnail-${file.name}`),
            {
                dir: 'thumbnail'
            }
        );
        editData.coverFilePath = res.filePath
    } finally {
        window.URL.revokeObjectURL(blob);
        thumbnailBlob = null;
    }
}
async function uploadOrigin(file: File) {
    try {

        const res = await uploadService.uploadSingleFile(
            file
        );
        editData.filePath = res.filePath
    } finally {

    }
}

async function onFileChange(file: File) {
    uploadThumbnail(file);
    uploadOrigin(file);
    editData.name = file.name
}


async function onSubmit() {
    imageService.createImage({
        name: editData.name,
        tagIds: editData.tagIds,
        cloudValue: editData.cloudValue,
        coverFilePath: editData.coverFilePath,
        remark: editData.remark,
        link: editData.link,
        filePath: editData.filePath,
    })
}
</script>

<style lang="scss"></style>