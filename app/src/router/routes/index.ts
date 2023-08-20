import { RouteRecordRaw } from 'vue-router'

export const route: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('@/layouts/default/defaultLayout.vue')
    }
]
