<template>
    <NCard>
        <div style="width: 750px" class="mx-auto">
            <NForm label-width="120px" label-placement="left" label-align="right">
                <NFormItem label="上传文件">
                    <div class="w-full">
                        <DragFile
                            ref="dragFileRef"
                            @uploaded="onFileUploaded"
                            @change="onFileChange"
                            @image-load="onImageLoaded"
                        />
                    </div>
                </NFormItem>
                <NFormItem label="文件名称">
                    <NInput v-model:value="editData.name" />
                </NFormItem>
                <NFormItem label="文件备注">
                    <NInput v-model:value="editData.remark" type="textarea" />
                </NFormItem>
                <NFormItem label="文件原链接">
                    <NInput v-model:value="editData.link" />
                </NFormItem>
                <NFormItem label="标签">
                    <TagSelect v-model="editData.tagIds" />
                </NFormItem>
                <NFormItem>
                    <NButton v-if="submitted" @click="onResetData">
                        上传新的
                    </NButton>
                    <NButton
                        v-else
                        :loading="loading.submit"
                        type="primary"
                        @click="onSubmit"
                    >
                        提交
                    </NButton>
                </NFormItem>
            </NForm>
        </div>
    </NCard>
</template>
<script setup lang="ts">
import { NCard, NForm, NInput, NFormItem, NButton, useMessage } from 'naive-ui';
import DragFile from './components/DragFile.vue';
import TagSelect from './components/TagSelect.vue';

import { reactive, ref } from 'vue';
import { imageService } from '@/services/image';

// === 第三方组件
const message = useMessage();

// === loading 相关
const loading = reactive({
    submit: false
});


// 上传文件组件
const dragFileRef = ref<null | InstanceType<typeof DragFile>>(null);


// === 表单数据
const editData = reactive({
    tagIds: [],
    name: '',
    filePath: '',
    link: '',
    remark: '',
    coverFilePath: '',
    cloudValue: [] as any[],
    width: 200,
    height: 200,
});

function onFileUploaded(url: string, type: 'origin' | 'thumbnail') {
    if (type === 'thumbnail') {
        editData.coverFilePath = url;
    } else if (type === 'origin') {
        editData.filePath = url;
    }
}

function onFileChange(file: File) {
    editData.name = file.name.split('.').slice(0, -1).join('');
}

function onImageLoaded(image: { width: number, height: number }) {
    editData.width = image.width;
    editData.height = image.height;
}


const submitted = ref(false);
async function onSubmit() {
    if (loading.submit) return;
    loading.submit = true;
    try {
        await imageService.createImage({
            name: editData.name,
            tagIds: editData.tagIds,
            cloudValue: editData.cloudValue,
            coverFilePath: editData.coverFilePath,
            remark: editData.remark,
            link: editData.link,
            filePath: editData.filePath,
        });
        message.success('上传成功');
        submitted.value = true;
    } finally {
        loading.submit = false;
    }
}

/** 重置数据 */
function onResetData() {
    editData.name = '';
    editData.cloudValue = [];
    editData.link = '';
    editData.remark = '';
    editData.tagIds = [];
    submitted.value = false;
    dragFileRef.value!.onClearFile();
}
</script>

<style lang="scss"></style>