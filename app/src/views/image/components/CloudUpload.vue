<template>
    <div class="w-full">
        <div class="flex flex-justify-end">
            <NCheckbox v-model:checked="useThumbnail" :disabled="startUpload">是否同时上传缩略图</NCheckbox>
        </div>
        <NDivider></NDivider>
        <NList>
            <NListItem v-for="item in cloudList" :key="item.key">
                <NCheckbox v-model:checked="item.checked">{{ item.name }}</NCheckbox>
                <div v-if="startUpload" class="mt-2 ml-10">
                    <div class="flex items-center">
                        <div class="w-60px">缩略图</div>
                        <n-progress type="line" :percentage="item.thumbnailProcess" class="flex-1"
                            :status="item.thumbnailStatus" />
                        <div class="w-90px ml-2">
                            <NButton quaternary v-if="item.thumbnailStatus === 'error'"
                                @click="uploadSingle('thumbnail', item)">重新上传</NButton>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <div class="w-60px">原图</div>
                        <n-progress type="line" :percentage="item.originProcess" class="flex-1"
                            :status="item.originStatus" />
                        <div class="w-90px ml-2">
                            <NButton quaternary v-if="item.originStatus === 'error'" @click="uploadSingle('origin', item)">
                                重新上传</NButton>
                        </div>
                    </div>

                </div>
            </NListItem>
        </NList>

    </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue';
import { NCheckbox, NProgress, NDivider, NButton, NList, NListItem } from 'naive-ui'
import { cloudUpload } from '@/utils/cloudUpload';

const useThumbnail = ref(true)
const startUpload = ref(false)

const props = defineProps<{
    file: File | null,
    thumbnailFile: File | null,
}>()

interface ICloudItem {
    name: string;
    uploading: boolean;
    checked: boolean;
    key: string;
    originStatus: undefined | 'success' | 'error';
    originProcess: number;
    thumbnailProcess: number;
    thumbnailStatus: undefined | 'success' | 'error'
}

interface ICloudSubmitItem {
    key: string,
    name: string,
    accessUrl: string;
    type: 'origin' | 'thumbnail'
}

const cloudList = reactive<ICloudItem[]>([
    {
        name: '七牛云',
        uploading: false,
        checked: true,
        key: 'qiniu',
        originStatus: undefined,
        originProcess: 0,
        thumbnailProcess: 0,
        thumbnailStatus: undefined,
    },
])

function uploadSingle(type: 'origin' | 'thumbnail', item: ICloudItem) {
    if (type === 'origin') {
        item.originStatus = undefined;
        return cloudUpload(props.file!, {
            onUploadProgress: (e) => {
                item.originProcess = +((e.progress || 0) * 100).toFixed(0)
            }
        }).then((res) => {
            item.originStatus = 'success'
            const submitData: ICloudSubmitItem = {
                key: item.key,
                name: item.name,
                type: 'origin',
                accessUrl: res
            }
            return submitData;
        })
            .catch(() => {
                item.originStatus = 'error'
            })
    } else  {
        item.thumbnailStatus = undefined;
        return cloudUpload(props.thumbnailFile!, {
            onUploadProgress: (e) => {
                item.thumbnailProcess = +((e.progress || 0) * 100).toFixed(0)
            }
        }).then((res) => {
            item.thumbnailStatus = 'success'
            const submitData: ICloudSubmitItem = {
                key: item.key,
                name: item.name,
                type: 'origin',
                accessUrl: res
            }
            return submitData;
        }).catch(() => {
            item.thumbnailStatus = 'error'
        })
    }
}

async function uploadAll() {
    startUpload.value = true;
    const promiseStack: Promise<ICloudSubmitItem>[] = []
    cloudList.filter((item) => item.checked)
        .forEach(item => {
            const p1 = uploadSingle('origin', item);
            promiseStack.push(p1 as Promise<ICloudSubmitItem>);
            if (useThumbnail.value) {
                const p2 = uploadSingle('thumbnail', item);
                promiseStack.push(p2 as Promise<ICloudSubmitItem>);
            }

        })
    const res = await Promise.all(promiseStack);
    return res;
}

defineExpose({
    uploadAll,
})
</script>