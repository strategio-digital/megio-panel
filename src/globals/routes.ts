import { type RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'saas.view.login',
        props: { source: 'user', title: 'Přihlášení' },
        meta: { auth: false },
        component: () => import(/* webpackChunkName: "public" */ '@/views/public/Login.vue')
    },
    {
        path: '/admin',
        name: 'saas.view.admin.login',
        props: { source: 'admin', title: 'Admin přihlášení' },
        meta: { auth: false },
        component: () => import(/* webpackChunkName: "public" */ '@/views/public/Login.vue')
    },
    {
        path: '/dashboard',
        name: 'saas.view.dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard.vue')
    },
    {
        path: '/collections/:name',
        name: 'saas.view.collections',
        component: () => import(/* webpackChunkName: "collections" */ '@/views/Collections.vue')
    },
    {
        path: '/settings/resources',
        name: 'saas.view.settings.resources',
        meta: { inResources: false },
        component: () => import(/* webpackChunkName: "settings" */ '@/views/settings/Resources.vue')
    },
    {
        path: '/settings/admins',
        name: 'saas.view.settings.admins',
        meta: { inResources: false },
        component: () => import(/* webpackChunkName: "settings" */ '@/views/settings/Admins.vue')
    },
    {
        path: '/401',
        name: 'saas.view.401',
        meta: { inResources: false },
        component: () => import(/* webpackChunkName: "errors" */ '@/views/error/401.vue')
    }
]

export default routes