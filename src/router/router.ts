import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'
import { navigations, home } from '.';

// 主页路由配置
const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: home.path,
    }
]

// 页面路由配置
navigations.forEach(navItem => {
    routes.push({
        path: navItem.path,
        name: navItem.pageName,
        component: navItem.component,
        meta: {
            title: "芥末异变 - " + navItem.displayName,
        }
    })
});

// 实例化路由
const router = createRouter({
    routes: routes,
    history: createWebHashHistory(),    // 使用 “#/”，从我做起
});

export default router;