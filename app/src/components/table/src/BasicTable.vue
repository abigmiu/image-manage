<template>
    <div>
        <NDataTable ref="tableRef" v-bind="getBindValues">
            <template v-for="item in Object.keys($slots)" #[item]="data" :key="item">
                <slot :name="item" v-bind="data" />
            </template>
        </NDataTable>
    </div>
</template>
<script setup lang="ts">
import { NDataTable } from 'naive-ui';
import { dataTableProps } from 'naive-ui';
import { computed } from 'vue';


const props = defineProps({
    ...dataTableProps,
});


const getBindValues = computed(() => {
    return {
        ...props
    };
});
</script>