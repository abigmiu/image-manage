<template>
    <NMenu
        :options="menuOptions"
        class="default-layout--sider"
        inverted
        @update-value="onClickMenuItem"
    />
</template>
<script setup lang="ts">
import type { IRouteRecordRaw } from '@/types/app/router';
import type { MenuOption } from 'naive-ui';
import { NMenu } from 'naive-ui';
import { useRouter } from 'vue-router';

const router = useRouter();
const routes = router.options.routes;

const menuOptions: MenuOption[] = [];

routes?.forEach((route: IRouteRecordRaw) => {

    if (route.meta?.isMenu) {
        const menuOption = {
            label: route.meta!.title,
            key: route.name as string,
            children: (route.children || []).reduce((prev, childRoute: IRouteRecordRaw) => {
                if (childRoute.meta?.title) {
                    prev.push({
                        label: childRoute.meta!.title!,
                        key: childRoute.name as string
                    });
                }
                return prev;
            }, [] as MenuOption[])
        };

        menuOptions.push(menuOption);
    }

});

function onClickMenuItem(key: string) {
    router.push({
        name: key
    });
}
</script>