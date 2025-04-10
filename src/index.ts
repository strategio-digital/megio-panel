import '@/assets/style.scss'
import App from '@/App.vue'
import createRouter from '@/router'
import globals from '@/globals'
import { createApp } from 'vue'
import { megio, setup } from 'megio-api'
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
    IUpdateForm,
    ICreateForm,
    ICreateFormParams
} from '@/types'

export function useGlobals(): PanelGlobals {
    return globals()
}

export function useToast(): IToast {
    return toast()
}

export function useComponents() {
    // return type: IMegioComponents v ./types.ts vrací pouze DefinedComponent<{},{}, any> - nepozná props, atp.
    return megioComponents
}

export function useVuetify(): IVuetifyComponents {
    return vuetifyComponents
}

export function useCreateForm(params: ICreateFormParams): ICreateForm {
    return createForm(params)
}

export function useUpdateForm(recipeKey: string, rowId: string): IUpdateForm {
    return updateForm(recipeKey, rowId)
}

export function useRouter(): Router {
    return routerOrigin()
}

export function useRoute(): RouteLocationNormalizedLoaded {
    return routeOrigin()
}

export function createMegioPanel(
    megioApi: {
        baseUrl: string,
        errorHandler?: (
            response: Response,
            errors: string[],
            toast: IToast,
            router: Router
        ) => void,
    },
    options?: PanelOptions
): void {
    const toast = useToast()

    const app: HTMLElement | null = document.getElementById('megio-panel')

    if (! app) {
        throw new Error('Element <div id="megio-panel"></div> not found.')
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

    const appPath = app.dataset.appPath || '/'
    const versions = JSON.parse(app.dataset.appVersions || '{"yarn": "dev", "composer": "dev", "commit_reference": ""}')

    const vuetify = createVuetify(vuetifyOptions)
    const router = createRouter(options?.routes || routes, appPath)

    setup(megioApi.baseUrl, async (response, errors) => {
        if (typeof megioApi?.errorHandler !== 'function' && Array.isArray(errors)) {
            const rejectReason = response.headers.get('X-Auth-Reject-Reason')
            if (rejectReason === 'invalid_credentials' || rejectReason === 'invalid_permissions') {
                const name = megio.auth.user.hasRole('admin') ? 'megio.view.admin.login' : 'megio.view.login'
                megio.auth.logout()
                await router.push({ name })
            }
            errors.map(m => toast.add(m, 'error'))
        } else if (typeof megioApi?.errorHandler === 'function') {
            megioApi.errorHandler(response, errors, toast, router)
        }
    })

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


