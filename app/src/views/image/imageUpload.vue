<template>
    <NCard>
        <div class="upload-wrapper" @dragenter="onDragEnter" @dragover.prevent @dragleave="onDragLeave" @drop="fileDrop">
            <NIcon size="24">
                <CloudUploadOutlined />
            </NIcon>
        </div>
    </NCard>
</template>
<script setup lang="ts">
import { NCard, NIcon } from 'naive-ui'
import { CloudUploadOutlined } from '@vicons/antd'
import { uploadService } from '@/services/upload'; 

function onDragEnter(e: DragEvent) {
    (e.target as HTMLDivElement).toggleAttribute('allowdrop', true)
}

function fileDrop(e: DragEvent) {
    e.preventDefault();
    (e.target as HTMLDivElement).toggleAttribute('allowdrop', false);
    console.log(e)
    const file = e.dataTransfer?.files[0]
    if (!file) return;
    console.log(file);
    uploadFile(file);
}

function onDragLeave(e: DragEvent) {
    (e.target as HTMLDivElement).toggleAttribute('allowdrop', false)
}

function uploadFile(file: File) {
    uploadService.uploadSingleFile(file, {
        dir: 'thumbnail'
    });
}
</script>

<style lang="scss">
.upload-wrapper {
    width: 300px;
    height: 200px;
    border: 1px dashed rgb(224, 224, 230);
    transition: border-color .3s;

    &[allowdrop] {
        border-color: #18a058;
    }

    &:hover {
        border-color: #18a058;
    }
}
</style>