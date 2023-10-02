<template>
    <div>
        <NSpace>
            <NButton v-if="!isEdit" @click="onEdit">
                编辑
            </NButton>
            <NButton v-else @click="onSaveUpdate">
                保存
            </NButton>
        </NSpace>
        <NDescriptions :column="1">
            <NDescriptionsItem>
                <template #label>
                    图片
                </template>
                <NImage :width="200" :src="source.coverFilePath" :preview-src="source.filePath" />
            </NDescriptionsItem>
            <NDescriptionsItem>
                <template #label>
                    <div class="flex items-center">
                        <span class="mr-2">名称</span>
                    </div>
                </template>
                <NSpace v-if="isEdit">
                    <NInput v-model:value="editData.name" />
                </NSpace>
                <p v-else>
                    {{ source.name }}
                </p>
            </NDescriptionsItem>
            <NDescriptionsItem>
                <template #label>
                    <div class="flex items-center">
                        <span class="mr-2">备注</span>
                    </div>
                </template>
                <NSpace v-if="isEdit">
                    <NInput v-model:value="editData.remark" type="textarea" />
                </NSpace>
               
                <p v-else>
                    {{ source.remark }}
                </p>
            </NDescriptionsItem>
            <NDescriptionsItem>
                <template #label>
                    宽高
                </template>
                <p>宽：{{ source.width }}, 高：{{ source.height }}</p>
            </NDescriptionsItem>
            <NDescriptionsItem>
                <template #label>
                    创建时间
                </template>
                <p>{{ source.createAt }}</p>
            </NDescriptionsItem>
            <NDescriptionsItem>
                <template #label>
                    更新时间
                </template>
                <p>{{ source.updateAt }}</p>
            </NDescriptionsItem>
            <NDescriptionsItem>
                <template #label>
                    云备份
                </template>
                <div>
                    <div v-for="item in source.cloudValue" :key="item.key">
                        <p>{{ item.name }}</p>
                        <p><a :href="item.accessUrl" target="_blank">{{ item.accessUrl }}</a></p>
                    </div>
                </div>
            </NDescriptionsItem>
        </NDescriptions>
    </div>
</template>
<script setup lang="ts">
import { NSpace, NImage, NDescriptions, NDescriptionsItem } from 'naive-ui';
import { imageService } from '@/services/image';

const props = withDefaults(defineProps<{
    source: Record<string, any>,
}>(), {
    source: () => ({})
});

const isEdit = ref(false);
function onEdit() {
    isEdit.value = true;
    editData.name = props.source.name;
    editData.remark = props.source.remark;
}

const editData = reactive({
    name: '',
    remark: '',
});

async function onSaveUpdate() {
    await imageService.updateImage(props.source.id, editData);
    isEdit.value = false;
}


</script>