<template>
    <div class="upload-wrapper flex flex-col items-center justify-center" @dragenter="onDragEnter" @dragover.prevent
        @dragleave="onDragLeave" @drop="onFileDrop" @click="onFileClick">
        <NIcon size="24">
            <CloudUploadOutlined />
        </NIcon>

        <p class="text-center mt-5">点击或者拖动文件到该区域来上传</p>

        <input type="file" accept="image/*" class="file-input" @change="onFileChange" ref="fileRef" />
    </div>
</template>
<script setup lang="ts">
import { CloudUploadOutlined } from '@vicons/antd'
import { NIcon } from 'naive-ui'
import { ref } from 'vue';

const emits = defineEmits<{
    change: [file: File],
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
    if (!file.type.startsWith('image')) return;
    handleFileChange(file);
}


const fileRef = ref<null | HTMLInputElement>(null)
function onFileClick() {
    fileRef.value!.click();
}
function onFileChange(e: Event) {
    const { files } = e.target as HTMLInputElement;
    if (!files || !files.length) return;
    handleFileChange(files[0]);
}

function handleFileChange(file: File) {
    emits('change', file);
}


</script>
<style lang="scss" scoped>
.upload-wrapper {
    width: 300px;
    min-height: 200px;
    border: 1px dashed rgb(224, 224, 230);
    transition: border-color .3s;
    position: relative;

    &[allowdrop] {
        border-color: #18a058;
    }

    &:hover {
        border-color: #18a058;
    }

    .file-input {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
    }
}
</style>