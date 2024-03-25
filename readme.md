# Megio panel

Extendable admin panel for your Megio apps & APIs.

<img src="https://github.com/strategio-digital/megio-core/assets/4992367/baaa89b5-e62e-4a3a-b089-e9b69e9d790b" width="100%" alt="Megio core">

## Installation

`yarn add megio-panel`

## Minimal setup

```typescript
import 'megio-panel/styles'
import { createMegioPanel } from 'megio-panel'

const apiUrl = 'http://localhost:8090/'
createMegioPanel(apiUrl)
```

```html
<div id="megio-panel"></div>
```

## Advanced setup

### Setup branding & navbar

```typescript
import 'megio-panel/styles'
import { createMegioPanel, useGlobals } from 'megio-panel'
import { mdiReceiptText } from '@mdi/js'
import logo from '@/assets/img/strategio.svg'

// Get navbar globals
const { navbar } = useGlobals()

// Craate Megio panel
createMegioPanel('http://localhost:8090/', {
    navbar: {
        brand: {
            title: 'Your brand name',
            routeName: 'megio.view.dashboard',
            logo
        },
        items: [
            ...navbar.items,
            {
                title: 'Invoices',
                icon: mdiReceiptText,
                activePrefix: '/invoices',
                route: { name: 'megio.view.dashboard' }
            }
        ]
    }
})
```

### Extend routes & collection behavior

```typescript
import 'megio-panel/styles'
import { createMegioPanel, useGlobals } from 'megio-panel'

const { routes } = useGlobals()

createMegioPanel('http://localhost:8090/', {

    // Append routes with custom vue components
    routes: [
        ...routes,
        {
            path: '/invoice/:id',
            name: 'app.invoice.detail',
            component: () => import('@/views/InvoiceDetail.vue')
        },
        {
            path: '/invoice',
            name: 'app.invoice.summary',
            component: () => import('@/views/InvoiceSummary.vue')
        }
    ],

    // Change row-click behavior for any collection
    collection: {
        summaries: router => [
            {
                collectionName: 'user',
                onFirstColumnClick: ({}, row) => router.push({
                    name: 'app.user.detail',
                    params: { id: row.id }
                })
            }
        ]
    }
})
```

### Add column-renderers, actions & modals

```typescript
import 'megio-panel/styles'
import { createMegioPanel, useGlobals } from 'megio-panel'
import MyColumnRenderer from '@/columns/MyColumnRenderer.vue'
import MyResetPasswordModal from '@/modals/MyResetPasswordModal.vue'

const { columns, modals, actions } = useGlobals()

createMegioPanel('http://localhost:8090/', {
    datagrid: {

        // Add column renderer
        columns: [
            ...columns,
            { 
                rendererName: 'my-column-renderer', 
                component: MyColumnRenderer 
            }
        ],

        // Add modal opening by 'resetPassword' trigger
        modals: [
            ...modals,
            { 
                onAction: 'resetPassword', 
                component: MyResetPasswordModal 
            }
        ],

        actions: {

            // Add bulk button with 'resetPassword' trigger
            bulk: [
                ...actions.bulk,
                {
                    label: 'Reset',
                    name: 'resetPassword',
                    showOn: ['/collections/user', '/collections/@']
                }
            ],

            // Add row button with 'resetPassword' trigger
            row: [
                ...actions.row,
                {
                    label: 'Reset',
                    name: 'resetPassword',
                    showOn: ['/collections/user', '/collections/@']
                }
            ]
        }
    }
})
```

## Working with types

```typescript
import 'megio-panel/styles'
import { createMegioPanel, useGlobals } from 'megio-panel'
import type { INavbarSettings } from 'megio-panel/types'

const { navbar } = useGlobals()

// Setup navbar branding
const brand: INavbarSettings['brand'] = {
    title: 'Your brand name',
    routeName: 'megio.view.dashboard',
    logo: navbar.brand.logo
}

// Create Megio panel
createMegioPanel('http://localhost:8090/', {
    navbar: {
        brand,
        items: navbar.items
    }
})
```