<template>
    <NMenu :options="menuOptions" class="default-layout--sider" inverted>

    </NMenu>
</template>
<script setup lang="ts">
import type { MenuOption } from 'naive-ui'
import { NMenu } from 'naive-ui'

const menuOptions: MenuOption[] = [
    {
        label: '图片管理',
        key: 'image-manage',
        children: [
            {
                label: '上传图片',
                key: 'image-manage--upload',
            },
            {
                label: '图片列表',
                key: 'image-manage--list'
            }
        ]
    },
    {
        label: '标签管理',
        key: 'tags-manage',
        children: [
            {
                label: '标签列表',
                key: 'tags-manage-list'
            }
        ]
    }
]
</script>