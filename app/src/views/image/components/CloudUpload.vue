<template>
    <div class="w-full">
        <NDivider></NDivider>
        <NList>
            <NListItem v-for="item in cloudList" :key="item.key">
                <NCheckbox v-model:checked="item.checked">{{ item.name }}</NCheckbox>
                <div v-if="startUpload" class="mt-2 ml-10">
                    <div class="flex items-center">
                        <div class="w-60px">原图</div>
                        <n-progress type="line" :percentage="item.originProcess" class="flex-1"
                            :status="item.originStatus" />
                        <div class="w-90px ml-2">
                            <NButton quaternary v-if="item.originStatus === 'error'" @click="uploadSingle(item)">
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
}

interface ICloudSubmitItem {
    key: string,
    name: string,
    accessUrl: string;
}

const cloudList = reactive<ICloudItem[]>([
    {
        name: '七牛云',
        uploading: false,
        checked: true,
        key: 'qiniu',
        originStatus: undefined,
        originProcess: 0,
    },
])

function uploadSingle(item: ICloudItem) {
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
                accessUrl: res
            }
            return submitData;
        })
            .catch(() => {
                item.originStatus = 'error'
            })
}

async function uploadAll() {
    startUpload.value = true;
    const promiseStack: Promise<ICloudSubmitItem>[] = []
    cloudList.filter((item) => item.checked)
        .forEach(item => {
            const p1 = uploadSingle(item);
            promiseStack.push(p1 as Promise<ICloudSubmitItem>);
        })
    const res = await Promise.all(promiseStack);
    return res;
}

defineExpose({
    uploadAll,
})
</script>