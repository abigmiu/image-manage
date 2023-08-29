<template>
    <div class="w-full">
        <div class="flex flex-justify-end">
            <NCheckbox v-model:checked="useThumbnail" :disabled="startUpload">是否同时上传缩略图</NCheckbox>
        </div>
        <NButton @click="uploadAll">测试</NButton>
        <NDivider></NDivider>
        <NList>
            <NListItem v-for="item in cloudList" :key="item.key">
                <NCheckbox v-model:checked="item.checked">{{ item.name }}</NCheckbox>
                <div v-if="startUpload" class="mt-2 ml-10">
                    <div class="flex items-center">
                        <div class="w-60px">缩略图</div>
                        <n-progress type="line" :percentage="10" class="flex-1" />
                        <div class="w-90px ml-2">
                            <NButton quaternary v-if="item.thumbnailError">重新上传</NButton>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <div class="w-60px">原图</div>
                        <n-progress type="line" :percentage="10" class="flex-1" />
                        <div class="w-90px ml-2">
                            <NButton quaternary v-if="item.originError">重新上传</NButton>
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

const cloudList = reactive([
    {
        name: '七牛云',
        uploading: false,
        checked: true,
        key: 'qiniu',
        originError: false,
        originProcess: '',
        thumbnailError: false,
        thumbnailProcess: '',
    },
    {
        name: '七牛云2',
        uploading: false,
        checked: true,
        key: 'qiniu2',
        originError: false,
        originProcess: 0,
        thumbnailError: false,
        thumbnailProcess: 0,
    },
])

function uploadSingle(type: 'origin' | 'thumbnail', item: )

function uploadAll() {
    cloudList.filter((item) => item.checked)
        .forEach(item => {
            cloudUpload(props.file!, {
                onUploadProgress: (e) => {
                    item.originProcess = (e.progress || 0) * 100
                }
            }).catch(() => {
                
            })

            if (useThumbnail.value) {
                cloudUpload(props.thumbnailFile!, {
                    onUploadProgress: (e) => {
                        item.originProcess = (e.progress || 0) * 100
                    }
                })
            }
        })
}
</script>