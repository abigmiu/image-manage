import { RouteRecordRaw } from 'vue-router'

export const route: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('@/layouts/default/defaultLayout.vue'),
        children: [
            {
                path: 'image-list',
                component: () => import('@/views/image/imageList.vue')
            },
            {
                path: 'image-create',
                component: () => import('@/views/image/imageUpload.vue')
            }
        ]
    }
]
