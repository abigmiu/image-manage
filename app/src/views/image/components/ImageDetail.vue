<template>
    <div>
        <NDescriptions :column="1">
            <NDescriptionsItem>
                <template #label>
                    图片
                </template>
                <NImage :width="200" :src="source.coverFilePath" :preview-src="source.filePath" />
            </NDescriptionsItem>
            <NDescriptionsItem>
                <template #label>
                    名称
                </template>
                <p>{{ source.name }}</p>
            </NDescriptionsItem>
            <NDescriptionsItem>
                <template #label>
                    备注
                </template>
                <p>{{ source.remark }}</p>
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


const props = withDefaults(defineProps<{
    source: Record<string, any>,
}>(), {
    source: () => ({})
});
</script>