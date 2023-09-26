import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: '/login',
        meta: {
            title: '登录'
        },
        component: () => import('@/views/login/loginPage.vue'),
    }
];

export default routes;