import type { IRouteRecordRaw } from "@/types/app/router";

const routes: IRouteRecordRaw[] = [
    {
        path: '/login',
        name: 'Login',
        meta: {
            isMenu: false,
            title: '登录'
        },
        component: () => import('@/views/login/loginPage.vue'),
    }
];

export default routes;