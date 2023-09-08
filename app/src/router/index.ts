import { App } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { route } from './routes/index';

export const router = createRouter({
    history: createWebHistory(),
    routes: route,
    scrollBehavior: () => ({
        left: 0,
        top: 0,
    })
});

export function setupRouter(app: App) {
    app.use(router);
}