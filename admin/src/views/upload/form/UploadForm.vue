<template>
  <div>
    <div class="n-layout-page-header">
      <n-card :bordered="false" title="图片上传">
        <n-form
          :label-width="90"
          :model="formValue"
          :rules="rules"
          label-placement="left"
          ref="formRef"
          class="py-8"
        >
          <n-form-item label="选择存储桶" path="bucket">
            <n-select
              v-model:value="formValue.bucket"
              size="large"
              :options="bucketOptions"
              multiple
            />
          </n-form-item>
          <!-- <n-form-item label="选择相册" path="album">
            <n-select
              v-model:value="formValue.album"
              size="large"
              :options="albumOptions"
              multiple
            />
          </n-form-item> -->
        </n-form>
      </n-card>
    </div>
    <div class="flex mt-4">
      <n-card :bordered="false" class="mr-4 proCard flex-1">
        <n-upload
          :custom-request="customRequest"
          multiple
          :show-file-list="false"
          :on-update:file-list="handleFileListChange"
          :on-change="handleUploadChange"
        >
          <n-upload-dragger class="py-20">
            <div style="margin-bottom: 12px">
              <n-icon size="48" :depth="3">
                <CloudUploadOutlined />
              </n-icon>
            </div>
            <n-text style="font-size: 16px"> 点击或者拖动文件到该区域来上传 </n-text>
            <n-p depth="3" style="margin: 8px 0 0 0">
              支持同时上传最多 30 张图片，单个文件最大 20 MB
            </n-p>
          </n-upload-dragger>
        </n-upload>
      </n-card>
      <n-card :bordered="false" class="proCard" style="width: 400px">
        <div>上传列表</div>
        <div>
          <NUpload
            class="w-full"
            :file-list="fileList"
            :show-file-list="false"
            list-type="image"
            abstract
            :show-remove-button="false"
          >
            <!-- <NUploadTrigger class="w-full" /> -->
            <NUploadFileList class="w-full" />
          </NUpload>
        </div>
      </n-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, unref, reactive, onMounted } from 'vue';
  import { CloudUploadOutlined } from '@vicons/antd';
  import {
    NUpload,
    NUploadDragger,
    NUploadTrigger,
    UploadCustomRequestOptions,
    UploadFileInfo,
    NUploadFileList,
  } from 'naive-ui';
  import { createUploadAsyncTask, uploadImageWithThumb } from '@/api/upload/upload';
  import imageBlobReduce from 'image-blob-reduce';
  import { getImageDimensions } from '@/utils';
  import { createImageInfo } from '@/api/image/image';
  import { getBucketTableList } from '@/api/bucket/bucket';

  const rules = {};
  const defaultValueRef = () => ({
    bucket: [],
    album: [],
  });
  const formValue = reactive(defaultValueRef());

  const bucketOptions = ref([]);
  const albumOptions = [];

  const imagesResult: Array<any> = [];

  const getBuckets = async () => {
    const res = await getBucketTableList();
    bucketOptions.value = res.map((item) => ({
      label: item.name,
      value: item.id,
    }));
  };
  onMounted(() => {
    getBuckets();
  });

  const customRequest = async (options: UploadCustomRequestOptions) => {
    if (!options.file.file) return;

    const compressedBlob = await imageBlobReduce().toBlob(options.file.file, { max: 300 });
    const compressImage = new File([compressedBlob], `thumb-${options.file.file.name}`);
    const { width: thumbWidth, height: thumbHeight } = await getImageDimensions(compressImage);
    const { width: originWidth, height: originHeight } = await getImageDimensions(
      options.file.file
    );

    try {
      const res = await uploadImageWithThumb(
        options.file.file,
        compressImage,
        {
          thumbWidth,
          thumbHeight,
          originWidth,
          originHeight,
        },
        {
          onUploadProgress: ({ progress }) => {
            options.onProgress({
              percent: Math.ceil(progress || 0),
            });
          },
        }
      );
      console.log('🚀 ~ customRequest ~ res:', res);
      const { result } = res.data as any;
      imagesResult.push(res);
      const imageInfoRes = await createImageInfo({
        thumbId: result.thumb.id,
        originId: result.thumb.id,
        name: options.file.file.name,
      });

      createUploadAsyncTask({
        imageId: imageInfoRes.result.id,
        bucketIds: formValue.bucket,
      });
    } catch (e) {
      console.error('🚀 ~ customRequest ~ e:', e);
      options.onError();
    } finally {
      options.onFinish();
    }
  };

  const fileList = ref<UploadFileInfo[]>([]);
  const handleUploadChange = (data: { fileList: UploadFileInfo[] }) => {
    fileList.value = data.fileList;
    console.log('🚀 ~ handleUploadChange ~ e:', data);
  };

  const handleFileListChange = (e: UploadFileInfo[]) => {
    // fileList.value = e;
    console.log('🚀 ~ handleFileListChange ~ e:', e);
  };
</script>
