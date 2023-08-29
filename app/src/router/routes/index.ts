import { RouteRecordRaw } from 'vue-router'
import defaultLayout from '@/layouts/default/defaultLayout.vue'
import App from '@/App.vue'

export const route: RouteRecordRaw[] = [
    {
        path: '/',
        component: App,
        children: [
            {
                path: '/image',
                component: defaultLayout,
                name: 'image',
                meta: {
                    title: '图片管理',
                },
                children: [
                    {
                        path: 'list',
                        name: 'imageList',
                        meta: {
                            title: '图片列表',

                        },
                        component: () => import('@/views/image/imageList.vue')
                    },
                    {
                        path: 'create',
                        name: 'imageCreate',
                        meta: {
                            title: '创建图片',

                        },
                        component: () => import('@/views/image/imageUpload.vue')
                    }
                ]
            },
            {
                path: '/tags',
                component: defaultLayout,
                name: 'tags',
                meta: {
                    title: '标签管理',
                },
                children: [
                    {
                        path: 'list',
                        name: 'tagsList',
                        meta: {
                            title: '标签列表',
                        },
                        component: () => import('@/views/tags/tagsList.vue')
                    }
                ]
            }
        ]
    },

]
