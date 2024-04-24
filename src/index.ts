import '@/assets/style.scss'
import App from '@/App.vue'
import createRouter from '@/router'
import globals from '@/globals'
import { createApp } from 'vue'
import { setup } from 'megio-api'
import { createVuetify } from 'vuetify'
import { useToast as toast } from '@/components/toast/useToast'
import { useCreateForm as createForm } from '@/components/datagrid/form/useCreateForm'
import { useUpdateForm as updateForm } from '@/components/datagrid/form/useUpdateForm'
import { useRouter as routerOrigin, useRoute as routeOrigin } from 'vue-router'
import { vuetifyComponents, vuetifyOptions } from '@/plugins/vuetify'
import { megioComponents } from '@/components'
import type { Router, RouteLocationNormalizedLoaded } from 'vue-router'
import type {
    PanelOptions,
    PanelGlobals,
    IVuetifyComponents,
    IToast,
    IMegioComponents,
    ICreateForm,
    IUpdateForm
} from '@/types'


export function useGlobals(): PanelGlobals {
    return globals()
}

export function useToast(): IToast {
    return toast()
}

export function useComponents(): IMegioComponents {
    return megioComponents
}

export function useVuetify(): IVuetifyComponents {
    return vuetifyComponents
}

export function useCreateForm(recipeName: string): ICreateForm {
    return createForm(recipeName)
}

export function useUpdateForm(recipeName: string, rowId: string): IUpdateForm {
    return updateForm(recipeName, rowId)
}

export function useRouter(): Router {
    return routerOrigin()
}

export function useRoute(): RouteLocationNormalizedLoaded {
    return routeOrigin()
}

export function createMegioPanel(baseUrl: string, options?: PanelOptions): void {
    const toast = useToast()

    const app: HTMLElement | null = document.getElementById('megio-panel')

    if (! app) {
        return console.error('Element <div id="megio-panel"></div> not found.')
    }

    // Load default globals
    const {
        routes,
        modals,
        summaries,
        fields,
        columns,
        actions,
        navbar
    } = useGlobals()

    // Setup Megio-API SDK
    setup(baseUrl, (r, e) => {
        if (Array.isArray(e)) {
            e.map(m => toast.add(m, 'error'))
        }
    })

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
            app.provide('datagrid-fields', options?.datagrid?.fields || fields)
            app.provide('collection-summaries', options?.collection?.summaries(router) || summaries(router))
            app.use(vuetify)
            app.use(router)
        }
    }).mount(app)
}


