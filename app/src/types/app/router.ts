import type { RouteRecordRaw } from "vue-router";

export type IRouteRecordRaw = RouteRecordRaw & {
    meta?: {
        isMenu?: boolean;
        title?: string;
    }
}