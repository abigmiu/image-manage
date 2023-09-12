<template>
    <NSelect
        v-model:value="innerValue"
        multiple
        :options="options"
    />
</template>
<script setup lang="ts">
import { tagService } from '@/services/tags';
import type { SelectOption } from 'naive-ui';
import { NSelect } from 'naive-ui';
import { VNodeChild, computed, h, onMounted, reactive, ref } from 'vue';

type IProps = {
    modelValue: number[]
}
const props = withDefaults(defineProps<IProps>(), {
    modelValue: () => []
});  
const emits = defineEmits<{
    'update:modelValue': [data: number[]]
}>();

const innerValue = computed({
    get() {
        return props.modelValue;
    },
    set(val: number[]) {
        console.log(val);
        emits('update:modelValue', val);
    }
});
const options = reactive<SelectOption[]>([]);
async function fetchTags() {
    const res = await tagService.getList();
    res.forEach((tag) => {
        options.push({
            label: tag.name,
            value: tag.id
        });
    });
}
onMounted(() => fetchTags());
</script>