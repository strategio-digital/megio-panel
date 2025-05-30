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
        component: () => import(/* webpackChunkName: "collections" */ '@/views/collections/ReadAll.vue')
    },
    {
        path: '/collections/:name/create',
        name: 'megio.view.collections.create',
        component: () => import(/* webpackChunkName: "collections" */ '@/views/collections/Create.vue')
    },
    {
        path: '/collections/:name/update/:id',
        name: 'megio.view.collections.update',
        component: () => import(/* webpackChunkName: "collections" */ '@/views/collections/Update.vue')
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
        component: () => import(/* webpackChunkName: "settings" */ '@/views/settings/admin/ReadAll.vue')
    },
    {
        path: '/settings/admins/create',
        name: 'megio.view.settings.admins.create',
        meta: { inResources: false },
        component: () => import(/* webpackChunkName: "settings" */ '@/views/settings/admin/Create.vue')
    },
    {
        path: '/settings/admins/update/:id',
        name: 'megio.view.settings.admins.update',
        meta: { inResources: false },
        component: () => import(/* webpackChunkName: "settings" */ '@/views/settings/admin/Update.vue')
    },
    {
        path: '/settings/queue',
        name: 'megio.view.settings.queue',
        meta: { inResources: false },
        component: () => import(/* webpackChunkName: "settings" */ '@/views/settings/queue/ReadAll.vue')
    },
    {
        path: '/settings/queue/create',
        name: 'megio.view.settings.queue.create',
        meta: { inResources: false },
        component: () => import(/* webpackChunkName: "settings" */ '@/views/settings/queue/Create.vue')
    },
    {
        path: '/settings/queue/update/:id',
        name: 'megio.view.settings.queue.update',
        meta: { inResources: false },
        component: () => import(/* webpackChunkName: "settings" */ '@/views/settings/queue/Update.vue')
    },
    {
        path: '/401',
        name: 'megio.view.401',
        meta: { inResources: false },
        component: () => import(/* webpackChunkName: "errors" */ '@/views/error/401.vue')
    }
]

export default routes