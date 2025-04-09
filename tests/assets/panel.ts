import 'megio-panel/styles'
import { mdiFaceManProfile } from '@mdi/js'
import { createMegioPanel, useGlobals } from 'megio-panel'
import { RouteRecordRaw } from 'megio-panel/types'
import MyCustomModal from './panel/datagrid/modals/MyCustomModal.vue'

const API_ENDPOINT: string = 'http://localhost:8090/'

const {
    routes,
    modals,
    actions,
    columns,
    fields,
    navbar
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
        name: 'app.view.custom-view',
        component: () => import('./panel/views/MyCustomView.vue')
    },
    {
        path: '/users',
        name: 'app.view.users',
        component: () => import('./panel/views/user/ReadAll.vue')
    },
    {
        path: '/users/create',
        name: 'app.view.users.create',
        component: () => import('./panel/views/user/Create.vue')
    },
    {
        path: '/users/update/:id',
        name: 'app.view.users.update',
        component: () => import('./panel/views/user/Update.vue')
    }
]

createMegioPanel({ baseUrl: API_ENDPOINT }, {
    routes: ownRoutes,
    navbar: {
        brand: navbar.brand,
        items: [
            ...navbar.items,
            {
                title: 'Uživatelé',
                activePrefix: '/users',
                route: { name: 'app.view.users' },
                icon: mdiFaceManProfile
            }
        ]
    },
    datagrid: {
        ...datagrid,
        modals: [
            ...modals,
            //Vlastní modální okno otevírané přes akci `custom-action`
            {
                component: MyCustomModal,

                // Název akce, která má otevřít tento modal
                onAction: 'custom-action'
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
                    showOn: ['/users']
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
                    showOn: ['/users']
                }
            ]
        }
    }
})