<template>
  <n-form
    :model="formParams"
    :rules="rules"
    ref="formRef"
    label-placement="left"
    :label-width="80"
    class="py-4"
  >
    <n-form-item label="名称" path="name">
      <n-input placeholder="请输入名称" v-model:value="formParams.name" />
    </n-form-item>
    <n-form-item label="备注" path="name">
      <n-input placeholder="请输入备注" v-model:value="formParams.remark" />
    </n-form-item>
    <n-form-item label="类型" path="type">
      <n-select
        v-model:value="formParams.type"
        :options="bucketTypeOptions"
        @update:value="onBucketTypeChange"
      />
    </n-form-item>

    <n-form-item
      v-for="item in selectBucketConfigOptions"
      :key="item.field"
      :label="item.name"
      :path="item.field"
    >
      <template v-if="item.type === 'input'">
        <n-input placeholder="请输入" v-model:value="formParams.config[item.field]" />
      </template>
    </n-form-item>
  </n-form>
</template>

<script lang="ts" setup>
  import { reactive, ref, defineExpose } from 'vue';
  import { typeOptions } from './bucketTypeConfig';

  const formParams = reactive({
    name: '',
    type: null,
    remark: null,
    config: {},
  });

  const rules = [];

  const bucketTypeOptions = [
    {
      label: '七牛云',
      value: 1,
    },
  ];

  const onBucketTypeChange = (value: number) => {
    selectBucketConfigOptions.value = typeOptions[value];
  };

  const selectBucketConfigOptions = ref([]);

  defineExpose({
    data: formParams,
  });
</script>
