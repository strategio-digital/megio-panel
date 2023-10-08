# Megio Panel

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
import { createMegioPanel } from 'megio-panel'
import { navbar } from 'megio-panel/globals'
import { mdiReceiptText } from '@mdi/js'
import yourLogo from '@/assets/img/strategio.svg'

// Setup API end-point
const apiUrl = 'http://localhost:8090/'

// Craate Megio panel
createMegioPanel(apiUrl, {
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
import { createMegioPanel } from 'megio-panel'
import { routes } from 'megio-panel/globals'

const apiUrl = 'http://localhost:8090/'

createMegioPanel(apiUrl, {

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
                onFirstColumnClick: (collection, row) => router.push({
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
import { createMegioPanel } from 'megio-panel'
import { columns, modals, actions } from 'megio-panel/globals'

import ColumnRenderer from '@/columns/ColumnRenderer.vue'
import ResetPasswordModal from '@/modals/ResetPasswordModal.vue'

const apiUrl = 'http://localhost:8090/'

createMegioPanel(apiUrl, {
    datagrid: {

        // Add column renderer
        columns: [
            ...columns,
            { types: ['customType'], component: ColumnRenderer }
        ],

        // Add modal opening by 'resetPassword' trigger
        modals: [
            ...modals,
            { onAction: 'resetPassword', component: ResetPasswordModal }
        ],

        actions: {

            // Add bulk button with 'resetPassword' trigger
            bulk: [
                ...actions.bulk,
                {
                    label: 'Reset',
                    name: 'resetPassword',
                    showOn: ['/collections/user']
                }
            ],

            // Add row button with 'resetPassword' trigger
            row: [
                ...actions.row,
                {
                    label: 'Reset',
                    name: 'resetPassword',
                    showOn: ['/collections/user']
                }
            ]
        }
    }
})
```

## Working with types

```typescript
import 'megio-panel/styles'
import { createMegioPanel } from 'megio-panel'
import { navbar } from 'megio-panel/globals'
import type { INavbarSettings } from 'megio-panel/types'

// Setup navbar branding
const brand: INavbarSettings['brand'] = {
    title: 'Your brand name',
    routeName: 'megio.view.dashboard',
    logo
}

// Create Megio panel
createMegioPanel('http://localhost:8090/', {
    navbar: {
        brand,
        items: navbar.items
    }
})
```