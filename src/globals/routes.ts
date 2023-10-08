import { type RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'megio.view.login',
        props: { source: 'user', title: 'Přihlášení' },
        meta: { auth: false },
        component: () => import(/* webpackChunkName: "public" */ '@/views/public/Login.vue')
    },
    {
        path: '/admin',
        name: 'megio.view.admin.login',
        props: { source: 'admin', title: 'Admin přihlášení' },
        meta: { auth: false },
        component: () => import(/* webpackChunkName: "public" */ '@/views/public/Login.vue')
    },
    {
        path: '/dashboard',
        name: 'megio.view.dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard.vue')
    },
    {
        path: '/collections/:name',
        name: 'megio.view.collections',
        component: () => import(/* webpackChunkName: "collections" */ '@/views/Collections.vue')
    },
    {
        path: '/settings/resources',
        name: 'megio.view.settings.resources',
        meta: { inResources: false },
        component: () => import(/* webpackChunkName: "settings" */ '@/views/settings/Resources.vue')
    },
    {
        path: '/settings/admins',
        name: 'megio.view.settings.admins',
        meta: { inResources: false },
        component: () => import(/* webpackChunkName: "settings" */ '@/views/settings/Admins.vue')
    },
    {
        path: '/401',
        name: 'megio.view.401',
        meta: { inResources: false },
        component: () => import(/* webpackChunkName: "errors" */ '@/views/error/401.vue')
    }
]

export default routes