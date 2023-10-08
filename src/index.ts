import '@/assets/style.scss'
import { createApp } from 'vue'
import { setup } from 'megio-api'
import { createVuetify } from 'vuetify'
import { vuetifyOptions } from '@/plugins/vuetify'
import { useToast } from '@/components/toast/useToast'
import App from '@/App.vue'
import createRouter from '@/router'
import type { PanelOptions } from '@/types'

import navbar from '@/globals/navbar'
import routes from '@/globals/routes'
import modals from '@/globals/datagrid/modals'
import columns from '@/globals/datagrid/columns'
import actions from '@/globals/datagrid/actions'
import summaries from '@/globals/collection/summaries'

export function createMegioPanel(baseUrl: string, options?: PanelOptions) {
    const app: HTMLElement | null = document.getElementById('megio-panel')

    if (! app) {
        return console.error('Element <div id="megio-panel"></div> not found.')
    }

    const toast = useToast()

    // Setup Megio-API SDK
    setup(baseUrl, (r, e) => e.map(m => toast.add(m, 'error')))

    const appPath = app.dataset.appPath || '/'
    const versions = JSON.parse(app.dataset.appVersions || '{"yarn": "dev", "composer": "dev", "commit_reference": ""}')

    const vuetify = createVuetify(vuetifyOptions)
    const router = createRouter(options?.routes || routes, appPath)

    createApp(App).use({
        install: (app) => {
            app.provide('versions', versions)
            app.provide('navbar', options?.navbar || navbar)
            app.provide('datagrid-actions', options?.datagrid?.actions || actions)
            app.provide('datagrid-modals', options?.datagrid?.modals || modals)
            app.provide('datagrid-columns', options?.datagrid?.columns || columns)
            app.provide('collection-summaries', options?.collection?.summaries(router) || summaries(router))
            app.use(vuetify)
            app.use(router)
        }
    }).mount(app)
}
