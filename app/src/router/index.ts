import type { App } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { route } from './routes/index';
import openPageRoutes from './routes/openPage';

const routes = [
    ...openPageRoutes,
    ...route
];

export const router = createRouter({
    history: createWebHistory(),
    routes: routes,
    scrollBehavior: () => ({
        left: 0,
        top: 0,
    })
});

export function setupRouter(app: App) {
    app.use(router);
}

export function toLoginPage() {
    const { pathname, search } = window.location;
    router.replace({
        name: 'Login',
        query: {
            prePage: encodeURIComponent(`${pathname}${search}`)
        },
    });
}