<template>
    <div class="upload-wrapper flex flex-col items-center justify-center" @dragenter="onDragEnter" @dragover.prevent
        @dragleave="onDragLeave" @drop="onFileDrop" @click="onFileClick">
        <NIcon size="24">
            <CloudUploadOutlined />
        </NIcon>

        <p class="text-center mt-5">点击或者拖动文件到该区域来上传</p>
    </div>
</template>
<script setup lang="ts">
import { CloudUploadOutlined } from '@vicons/antd'
import { NIcon } from 'naive-ui'

const emits = defineEmits<{
    change: [file: File]
}>()

/**
 * 拖拽进入
 * @param e 
 */
function onDragEnter(e: DragEvent) {
    (e.target as HTMLDivElement).toggleAttribute('allowdrop', true)
}
/**
 * 拖拽离开
 * @param e 
 */
function onDragLeave(e: DragEvent) {
    (e.target as HTMLDivElement).toggleAttribute('allowdrop', false)
}
/**
 * 拖拽放置完成
 * @param e 
 */
function onFileDrop(e: DragEvent) {
    e.preventDefault();
    (e.target as HTMLDivElement).toggleAttribute('allowdrop', false);
    const file = e.dataTransfer?.files[0]
    if (!file) return;
    emits('change', file);
}

function onFileClick() {
    
}


</script>
<style lang="scss">
.upload-wrapper {
    width: 300px;
    min-height: 200px;
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