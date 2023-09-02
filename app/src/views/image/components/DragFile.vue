<template>
    <div v-if="showFileUpload" class="upload-wrapper flex flex-col items-center justify-center" @dragenter="onDragEnter"
        @dragover.prevent @dragleave="onDragLeave" @drop="onFileDrop" @click="onFileClick">
        <NIcon size="24">
            <CloudUploadOutlined />
        </NIcon>

        <p class="text-center mt-5">点击或者拖动文件到该区域来上传</p>

        <input type="file" accept="image/*" class="file-input" @change="onFileChange" ref="fileRef" />
    </div>
    <div v-else>
        <div class="inline-block relative">
            <NIcon class="absolute top-0 right-0 transform cursor-pointer" size="20"
                style="--un-translate-x: 50%;--un-translate-y: -50%;" @click="onClearFile">
                <CloseCircleFilled></CloseCircleFilled>
            </NIcon>
            <NImage width="300" :src="previewImageBlob!"></NImage>
        </div>
    </div>
    <div v-if="startUpload" class="mt-2 ml-10">
        <div class="flex items-center">
            <div class="w-60px">缩略图</div>
            <n-progress type="line" :percentage="uploadData.thumbnailProcess" class="flex-1"
                :status="uploadData.thumbnailStatus" />
            <div class="w-90px ml-2">
                <NButton quaternary v-if="uploadData.thumbnailStatus === 'error'" @click="uploadThumbnail">
                    重新上传</NButton>
            </div>
        </div>
        <div class="flex items-center">
            <div class="w-60px">原图</div>
            <n-progress type="line" :percentage="uploadData.originProcess" class="flex-1"
                :status="uploadData.originStatus" />
            <div class="w-90px ml-2">
                <NButton quaternary v-if="uploadData.originStatus === 'error'" @click="uploadOrigin">
                    重新上传</NButton>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { CloudUploadOutlined } from '@vicons/antd'
import { NIcon, NImage, NButton, NProgress } from 'naive-ui'
import { CloseCircleFilled } from '@vicons/antd'
import { onUnmounted, reactive, ref } from 'vue';
import { cloudUpload } from '@/utils/cloudUpload';
import { createImageThumbnail } from '@/utils/canvas';
import { blobToFile } from '@/utils/file';

const emits = defineEmits<{
    uploaded: [url: string, type: 'origin' | 'thumbnail'],
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

// 文件处理
const selectedFile = ref<null | File>(null)
const fileRef = ref<null | HTMLInputElement>(null)
const showFileUpload = ref(true)
const selectedThumbnailFile = ref<File | null>(null)

onUnmounted(() => {
    selectedFile.value = null;
    selectedThumbnailFile.value = null;
})


function onFileClick() {
    fileRef.value!.click();
}
function onFileChange(e: Event) {
    const { files } = e.target as HTMLInputElement;
    if (!files || !files.length) return;
    handleFileChange(files[0]);
}

async function handleFileChange(file: File) {
    selectedFile.value = file;
    startUpload.value = true;
    await handleShowPreview(file);
    emits('change', file);
    uploadOrigin();

    createThumbnailFile(file)
        .then((res) => {
            selectedThumbnailFile.value = res;
            uploadThumbnail();
        })
}

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
    return new Promise((resolve, reject) => {
        image.onload = () => {
            previewImageBlob.value = previewUrl;
            showFileUpload.value = false;
            resolve(previewUrl)
        }
        image.onerror = () => {
            reject()
        }
        image.src = previewUrl
    })

}

async function createThumbnailFile(file: File) {
    const blob = window.URL.createObjectURL(file);
    let thumbnailBlob: Blob | null = await createImageThumbnail(blob);
    const thumbnailFile = blobToFile(thumbnailBlob, `thumbnail-${file.name}`);
    window.URL.revokeObjectURL(blob);
    thumbnailBlob = null;
    return thumbnailFile;
}

function onClearFile() {
    selectedFile.value = null;
    selectedThumbnailFile.value = null;
    clearPreviewData();
    showFileUpload.value = true;
    emits('uploaded', '', 'thumbnail')
    emits('uploaded', '', 'origin')
    startUpload.value = false;
}



// 上传
interface ICloudItem {
    name: string;
    uploading: boolean;
    checked: boolean;
    key: string;
    originStatus: undefined | 'success' | 'error';
    originProcess: number;
    thumbnailStatus: undefined | 'success' | 'error';
    thumbnailProcess: number;
}

const startUpload = ref(false)

const uploadData = reactive<ICloudItem>(
    {
        name: '七牛云',
        uploading: false,
        checked: true,
        key: 'qiniu',
        originStatus: undefined,
        originProcess: 0,
        thumbnailStatus: undefined,
        thumbnailProcess: 0,
    },
)

/** 上传原图 */
function uploadOrigin() {
    uploadData.originStatus = undefined;
    cloudUpload(selectedFile.value!, undefined, {
        onUploadProgress: (e) => {
            uploadData.originProcess = +((e.progress || 0) * 100).toFixed(0)
        }
    }).then((res) => {
        uploadData.originStatus = 'success';
        emits('uploaded', res, 'origin')
    }).catch(() => {
        uploadData.originStatus = 'error'
    })
}

/** 上传缩略图 */
function uploadThumbnail() {
    uploadData.thumbnailStatus = undefined;
    cloudUpload(selectedFile.value!, { dir: 'thumbnail' }, {
        onUploadProgress: (e) => {
            uploadData.thumbnailProcess = +((e.progress || 0) * 100).toFixed(0)
        }
    }).then((res) => {
        uploadData.thumbnailStatus = 'success'
        emits('uploaded', res, 'thumbnail')
    }).catch(() => {
        uploadData.thumbnailStatus = 'error'
    })
}

defineExpose({
    onClearFile,
})

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