<template>
    <NCard>
        <div style="width: 750px" class="mx-auto">
            <NForm label-width="120px" label-placement="left" label-align="right">
                <NFormItem label="上传文件">
                    <div v-show="showFileUpload">
                        <DragFile @change="onFileChange"></DragFile>
                        <NCheckbox v-model:checked="useThumbnail" class="mt-2">上传缩略图</NCheckbox>
                    </div>
                    <div v-show="!showFileUpload">
                        <div class="inline-block relative">
                            <NIcon class="absolute top-0 right-0 transform cursor-pointer" size="20"
                                style="--un-translate-x: 50%;--un-translate-y: -50%;" @click="onClearFile">
                                <CloseCircleFilled></CloseCircleFilled>
                            </NIcon>
                            <NImage width="300" :src="previewImageBlob!"></NImage>
                        </div>
                    </div>
                </NFormItem>
                <NFormItem label="第三方存储">
                    <div>
                        <NCheckbox v-model:checked="useCloud">启用第三方存储</NCheckbox>
                        <CloudUpload v-if="useCloud" :file="selectedFile"></CloudUpload>
                    </div>

                </NFormItem>
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
                    <NButton @click="onResetData" v-if="submitted">上传新的</NButton>
                    <NButton v-else @click="onSubmit" :loading="loading.submit" type="primary">提交</NButton>
                </NFormItem>
            </NForm>
        </div>
    </NCard>
</template>
<script setup lang="ts">
import { NCard, NForm, NInput, NFormItem, NButton, NCheckbox, NImage, NIcon, useMessage } from 'naive-ui'
import { CloseCircleFilled } from '@vicons/antd'
import DragFile from './components/DragFile.vue';
import TagSelect from './components/TagSelect.vue';
import CloudUpload from './components/CloudUpload.vue';

import { reactive, ref, onUnmounted } from 'vue';
import { imageService } from '@/services/image';
import { uploadService } from '@/services/upload';
import { createImageThumbnail } from '@/utils/canvas';
import { blobToFile } from '@/utils/file';

// === 第三方组件
const message = useMessage();

// === loading 相关
const loading = reactive({
    submit: false
})

// 预览图片相关
const previewImageBlob = ref<string | null>(null)
onUnmounted(() => {
    clearPreviewData()

})

function clearPreviewData() {
    if (previewImageBlob.value) {
        window.URL.revokeObjectURL(previewImageBlob.value);
        previewImageBlob.value = null
    }
}
function handleShowPreview(file: File) {
    const previewUrl = window.URL.createObjectURL(file)
    const image = new Image();
    image.onload = () => {
        previewImageBlob.value = previewUrl;
        showFileUpload.value = false;
    }
    image.src = previewUrl
}


// === 文件上传相关
const useThumbnail = ref(true)
const useCloud = ref(true)
const selectedFile = ref<File | null>(null)
const selectedThumbnailFile = ref<File | null>(null)

const showFileUpload = ref(true)

onUnmounted(() => {

    selectedFile.value = null;


    selectedThumbnailFile.value = null;

})

function onClearFile() {
    editData.filePath = '';
    editData.coverFilePath = '';
    selectedFile.value = null;
    selectedThumbnailFile.value = null;
    clearPreviewData();
    showFileUpload.value = true;
}

async function createThumbnailFile(file: File) {
    const blob = window.URL.createObjectURL(file);
    let thumbnailBlob: Blob | null = await createImageThumbnail(blob);
    const thumbnailFile = blobToFile(thumbnailBlob, `thumbnail-${file.name}`);
    window.URL.revokeObjectURL(blob);
    thumbnailBlob = null;
    return thumbnailFile;
}

async function uploadThumbnail() {
    const thumbnailFile = selectedThumbnailFile.value!
    try {
        const res = await uploadService.uploadSingleFile(thumbnailFile, { dir: 'thumbnail' });
        editData.coverFilePath = res.filePath
        return res;
    } finally {

    }
}
async function uploadOrigin() {
    const file = selectedFile.value!
    try {
        const res = await uploadService.uploadSingleFile(file);
        editData.filePath = res.filePath;
        return res;
    } finally {

    }
}

/** 文件选择改变 */
async function onFileChange(file: File) {
    editData.name = file.name.split('.').slice(0, -1).join('');
    selectedFile.value = file;
    selectedThumbnailFile.value = await createThumbnailFile(file);
    handleShowPreview(file);
}


// === 表单数据

const editData = reactive({
    tagIds: [],
    name: '',
    filePath: '',
    link: '',
    remark: '',
    coverFilePath: '',
    cloudValue: [],
})



async function uploadAll() {
    await uploadOrigin();
    if (useThumbnail) {
        await uploadThumbnail();
    }
}

const submitted = ref(false)
async function onSubmit() {
    if (loading.submit) return;
    loading.submit = true;
    try {
        await uploadAll();
        await imageService.createImage({
            name: editData.name,
            tagIds: editData.tagIds,
            cloudValue: editData.cloudValue,
            coverFilePath: editData.coverFilePath,
            remark: editData.remark,
            link: editData.link,
            filePath: editData.filePath,
        })
        message.success('上传成功')
        submitted.value = true;
    } finally {
        loading.submit = false
    }
}

/** 重置数据 */
function onResetData() {
    onClearFile();
    editData.name = '';
    editData.cloudValue = [];
    editData.link = '';
    editData.remark = '';
    editData.tagIds = [];
    submitted.value = false;
}
</script>

<style lang="scss"></style>