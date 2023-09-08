<template>
    <NLayout class="default-layout" has-sider>
        <NLayoutSider inverted>
            <DefaultLayoutSider />
        </NLayoutSider>
        <NLayout class="default-layout-main">
            <NLayoutHeader class="default-layout-main__header">
                <DefaultLayoutHeader />
            </NLayoutHeader>
            <NLayoutContent class="default-layout-main__content">
                <DefaultLayoutContent />
            </NLayoutContent>
        </NLayout>
    </NLayout>
</template>
<script setup lang="ts">
import { NLayout, NLayoutContent, NLayoutHeader, NLayoutSider } from 'naive-ui';
import DefaultLayoutSider from './sider/defaultLayoutSider.vue';
import DefaultLayoutHeader from './header/defaultLayoutHeader.vue';
import DefaultLayoutContent from './content/defaultLayoutContent.vue';
</script>
<style lang="scss">
.default-layout {
    height: 100vh;

    &--sider {
        // background-color: #001529;
        height: 100%;
    }

    &-main {
        height: 100%;

        .n-layout-scroll-container {
            height: 100%;
            display: flex;
            flex-direction: column;
        }



        &__content {
            flex: 1;
            background: #f5f7f9;
        }
    }
}
</style>