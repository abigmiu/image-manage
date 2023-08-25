<template>
    <NCard>
        <DragFile></DragFile>
        <NForm>
            <NFormItem label="文件名称">
                <NInput></NInput>
            </NFormItem>
            <NFormItem label="文件备注">
                <NInput></NInput>
            </NFormItem>
            <NFormItem label="文件原链接">
                <NInput
                    type="textarea"
                ></NInput>
            </NFormItem>
        </NForm>
    </NCard>
</template>
<script setup lang="ts">
import { NCard, NForm, NInput, NFormItem } from 'naive-ui'
import DragFile from './components/DragFile.vue';

import { uploadService } from '@/services/upload';
import { createImageThumbnail } from '@/utils/canvas';
import { blobToFile } from '@/utils/file';



async function uploadFile(file: File) {
    const blob = window.URL.createObjectURL(file);
    let thumbnailBlob: Blob | null = await createImageThumbnail(blob);
    try {
        uploadService.uploadSingleFile(
            blobToFile(thumbnailBlob, `thumbnail-${file.name}`),
            {
                dir: 'thumbnail'
            }
        );
    } finally {
        window.URL.revokeObjectURL(blob);
        thumbnailBlob = null;
    }
}

</script>

<style lang="scss">

</style>