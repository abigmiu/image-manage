<template>
    <div class="default-layout-header">
        <div class="default-layout-header--left">
            <div class="trigger">
                <NIcon size="18">
                    <MenuFoldOutlined />
                </NIcon>
            </div>
            <div class="trigger">
                <NIcon size="18">
                    <ReloadOutlined />
                </NIcon>
            </div>

        </div>
        <div class="default-layout-header--right">
            <!-- 个人中心 -->
            <div class="trigger">
                <NDropdown trigger="hover">
                    <div class="avatar">
                        <NAvatar round>
                            <template #icon>
                                <UserOutlined />
                            </template>
                        </NAvatar>
                    </div>
                </NDropdown>
            </div>
            <!-- 项目配置 -->
            <div class="trigger">
                <NTooltip placement="bottom-end">
                    <template #trigger>
                        <NIcon size="18" style="font-weight: bold">
                            <SettingOutlined />
                        </NIcon>
                    </template>
                    <span>项目配置</span>
                </NTooltip>
            </div>

        </div>
    </div>
</template>
<script lang="ts" setup>
import { NIcon, NTooltip, NAvatar, NDropdown } from 'naive-ui';
import { MenuFoldOutlined, ReloadOutlined, SettingOutlined, UserOutlined } from '@vicons/antd'
</script>

<style lang="scss">
.default-layout-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    height: 64px;
    box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
    transition: all 0.2s ease-in-out;
    width: 100%;
    z-index: 11;

    &--left, &--right {
        height: 100%;
        display: flex;
        align-items: center;
    }

    .trigger {
        padding: 0 12px;
        cursor: pointer;
    }
}
</style>