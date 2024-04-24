import 'megio-panel/styles'
import { createMegioPanel, useGlobals } from 'megio-panel'
import { RouteRecordRaw } from 'megio-panel/types'
import MyCustomModal from './panel/datagrid/modals/MyCustomModal.vue'

// TODO: add complete admin CRUD
// TODO: export toast
// TODO: export Layout, etc.

const {
    routes,
    modals,
    actions,
    columns,
    fields
} = useGlobals()

const datagrid = { modals, actions, columns, fields }
const exclude: string[] = ['megio.view.dashboard']
const customRoutes = [...routes].filter(r => ! exclude.includes(r.name as string))

const ownRoutes: RouteRecordRaw[] = [
    ...customRoutes,
    {
        path: '/dashboard',
        name: 'megio.view.dashboard',
        component: () => import('./panel/views/Dashboard.vue')
    },
    {
        path: '/my-view',
        name: 'megio.view.custom-view',
        component: () => import('./panel/views/MyCustomView.vue')
    }
]

createMegioPanel('http://localhost:8090/', {
    routes: ownRoutes,
    datagrid: {
        ...datagrid,
        modals: [
            ...modals,
            //Vlastní modální okno otevírané přes akci `custom-action`
            {
                component: MyCustomModal,
                onAction: 'custom-action' // Název akce, která má otevřít tento modal
            }
        ],
        actions: {
            // Akce pro konkrétní řádek
            row: [
                ...actions.row,
                {
                    // Label zobrazeného tlačítka
                    label: 'Moje row akce',
                    // Trigger akce, jenž je přiřazena MyCustomModal.vue
                    name: 'custom-action',
                    // Zobrazí pouze u výchozí kolekce a u kolekce `user`
                    showOn: ['/collections/@', '/collections/user']
                }
            ],

            // Hromadné akce
            bulk: [
                ...actions.bulk,
                {
                    // Label zobrazeného tlačítka
                    label: 'Moje hromadná akce',
                    // Trigger akce, jenž je přiřazena MyCustomModal.vue
                    name: 'custom-action',
                    // Zobrazí pouze u výchozí kolekce a u kolekce `user`
                    showOn: ['/collections/@', '/collections/user']
                }
            ]
        }
    }
})