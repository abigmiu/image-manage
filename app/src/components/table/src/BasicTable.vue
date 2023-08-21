<template>
    <div>
        <NDataTable ref="tableRef" v-bind="getBindValues" >
            <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
                <slot :name="item" v-bind="data"></slot>
            </template>
        </NDataTable>
    </div>
</template>
<script setup lang="ts">
import { NDataTable } from 'naive-ui'
import { dataTableProps } from 'naive-ui'
import { computed } from 'vue';


const props = defineProps({
    ...dataTableProps,
})


const getBindValues = computed(() => {
    return {
        ...props
    }
})
</script>