<template>
    <NMenu 
        :options="menuOptions"
         class="default-layout--sider"
        inverted
        @update-value="onClickMenuItem"    
    >

    </NMenu>
</template>
<script setup lang="ts">
import type { MenuOption } from 'naive-ui'
import { NMenu } from 'naive-ui'
import { useRouter } from 'vue-router';

const router = useRouter();
const routes = router.options.routes[0].children;

const menuOptions: MenuOption[] = []

routes?.forEach(route => {
    menuOptions.push({
        label: route.meta!.title,
        key: route.name as string,
        children: (route.children || []).map((childRoute) => {
            console.log(childRoute);
            return {
                label: childRoute.meta!.title,
                key: childRoute.name as string
            }
        })
    })
})

function onClickMenuItem(key: string) {
    router.push({
        name: key
    })
}
</script>