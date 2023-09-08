<template>
    <NCard>
        <NSpace>
            <NTag
                v-for="item in tagsData"
                :key="item.id"
                :color="TAGS_COLOR_VALUE[item.colorType]"
                closable
                :style="{
                    '--n-close-icon-color': TAGS_COLOR_VALUE[item.colorType].textColor
                }"
                @close="onHandleDelete(item)"
            >
                {{ item.name }}
            </NTag>


            <NButton
                type="primary"
                dashed
                size="small"
                @click="onToggleCreate"
            >
                <template #icon>
                    <NIcon>
                        <PlusOutlined />
                    </NIcon>
                </template>
                添加
            </NButton>
        </NSpace>
    </NCard>
    <NModal v-model:show="showCreate" preset="card" style="width: 400px;">
        <NForm>
            <NFormItem label="名称">
                <NInput v-model:value="createValue.name" />
            </NFormItem>
            <NFormItem label="颜色">
                <NSelect v-model:value="createValue.colorType" :options="tagsColorOptions" />
            </NFormItem>
            <NFormItem>
                <div class="flex flex-justify-end w-full">
                    <NButton class="mr-2" @click="onToggleCreate">
                        取消
                    </NButton>
                    <NButton :loading="createLoading" type="primary" @click="onSubmitCreateTag">
                        确认
                    </NButton>
                </div>
            </NFormItem>
        </NForm>
    </NModal>
</template>
<script lang="ts" setup>
import { ITags, ITagsCreate } from '@/types/tags/tags';

import { NCard, NTag, NSpace, useDialog, NButton, NIcon, NInput, NModal, NForm, NFormItem, NSelect } from 'naive-ui';
import { PlusOutlined } from '@vicons/antd';

import { TAGS_COLOR_VALUE, TAGS_COLOR_NAME, TAGS_COLOR } from '@/constant/tags';
import { tagService } from '@/services/tags';
import { onMounted, reactive, ref } from 'vue';
import { SelectMixedOption } from 'naive-ui/es/select/src/interface';
import { ITagsCreateRequest } from '@/types/apis/request/tags/tags';


const dialog = useDialog();

const tagsData = reactive<ITags[]>([]);
async function fetchListData() {
    const res = await tagService.getList();
    Object.assign(tagsData, res);
}
onMounted(() => {
    fetchListData();
});


const tagsColorOptions: SelectMixedOption[] = [
    {
        label: TAGS_COLOR_NAME[TAGS_COLOR.NORMAL],
        value: TAGS_COLOR.NORMAL
    },
    {
        label: TAGS_COLOR_NAME[TAGS_COLOR.RED],
        value: TAGS_COLOR.RED
    },
    {
        label: TAGS_COLOR_NAME[TAGS_COLOR.YELLOW],
        value: TAGS_COLOR.YELLOW
    },
    {
        label: TAGS_COLOR_NAME[TAGS_COLOR.GRAY],
        value: TAGS_COLOR.GRAY
    },
    {
        label: TAGS_COLOR_NAME[TAGS_COLOR.BLUE],
        value: TAGS_COLOR.BLUE
    },
    {
        label: TAGS_COLOR_NAME[TAGS_COLOR.GREEN],
        value: TAGS_COLOR.GREEN
    },
    {
        label: TAGS_COLOR_NAME[TAGS_COLOR.PURPLE],
        value: TAGS_COLOR.PURPLE
    },
    {
        label: TAGS_COLOR_NAME[TAGS_COLOR.ORANGE],
        value: TAGS_COLOR.ORANGE
    },
];


const showCreate = ref(false);
const createValue = reactive<ITagsCreate>({
    name: '',
    colorType: null,
});
const createLoading = ref(false);
function onToggleCreate() {
    showCreate.value = !showCreate.value;
}
function onHandleDelete(item: ITags) {
    const dialogInstance = dialog.warning({
        title: '确认删除',
        content: `确定删除${item.name}？`,
        positiveText: '删除',
        negativeText: '放弃',
        onPositiveClick: async () => {
            dialogInstance.loading = true;
            await tagService.deleteTag(item.id);
            const index = tagsData.findIndex((tag) => tag.id === item.id);
            if (index !== -1) {
                tagsData.splice(index, 1);
            }
            dialogInstance.loading = false;
        },
    });
}
async function onSubmitCreateTag() {
    createLoading.value = true;
    try {
        const submitData: ITagsCreateRequest = {
            name: createValue.name,
            colorType: createValue.colorType!,
        };
        const res = await tagService.createTag(submitData);
        tagsData.push(res);
        onToggleCreate();

        createValue.name = '';
        createValue.colorType = null;
    } finally {
        createLoading.value = false;
    }
}
</script>