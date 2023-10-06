import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import '@/style.scss'

import type { App } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import type INavbarSettings from '@/components/navbar/types/INavbarSettings'
import type ICollectionSettings from '@/components/collection/types/ICollectionSettings'
import type IDatagridSettings from '@/components/datagrid/types/IDatagridSettings'
import type IVersions from '@/components/version/IVersions'

import { createVuetify } from 'vuetify'
import { vuetifyOptions } from '@/plugins/vuetify'
import createRouter from '@/router'

export type SaasOptions = {
    root: string
    versions: IVersions,
    routes: RouteRecordRaw[]
    navbar: INavbarSettings,
    datagrid: IDatagridSettings
    collection: ICollectionSettings
}

export const createPanel = (options: SaasOptions) => {
    const vuetify = createVuetify(vuetifyOptions)
    const router = createRouter(options.routes, options.root)

    return {
        install: (app: App) => {
            app.provide('navbar', options.navbar)
            app.provide('versions', options.versions)
            app.provide('datagrid-actions', options.datagrid.actions)
            app.provide('datagrid-modals', options.datagrid.modals)
            app.provide('datagrid-columns', options.datagrid.columns)
            app.provide('collection-summaries', options.collection.summaries(router))
            app.use(vuetify)
            app.use(router)
        }
    }
}