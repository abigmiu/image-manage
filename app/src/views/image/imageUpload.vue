<template>
    <NCard>
        <div class="upload-wrapper"  @dragover="fileDragover" @drop="fileDrop">
            <NIcon size="24">
                <CloudUploadOutlined />
            </NIcon>
        </div>
    </NCard>
</template>
<script setup lang="ts">
import { NCard, NIcon } from 'naive-ui'
import { CloudUploadOutlined } from '@vicons/antd'

function fileDragover(e: Event) {
    e.preventDefault()
    console.log('fileDragover')
}
function fileDrop(e: DragEvent) {
    e.preventDefault()
    console.log(e)
    const file = e.dataTransfer?.files[0]
    console.log(file);
}
 
</script>

<style lang="scss">
.upload-wrapper {
    width: 300px;
    height: 200px;
    border: 1px dashed rgb(224, 224, 230);

    &:hover {
        border-color: #18a058;
    }
}
</style>