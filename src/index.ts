import { createApp } from 'vue'
import { createPanel } from '@/createPanel'
import App from '@/App.vue'

// Customizable globals
import navbar from '@/globals/navbar'
import routes from '@/globals/routes'
import modals from '@/globals/datagrid/modals'
import columns from '@/globals/datagrid/columns'
import actions from '@/globals/datagrid/actions'
import summaries from '@/globals/collection/summaries'

const app: HTMLElement | null = document.getElementById('megio-panel')

if (app) {
    const appPath = app.dataset.appPath as string
    const appVersions = JSON.parse(app.dataset.appVersions as string)

    const panel = createPanel({
        root: appPath,
        versions: appVersions,
        routes,
        navbar,
        datagrid: { modals, columns, actions },
        collection: { summaries }
    })

    createApp(App).use(panel).mount(app)
}