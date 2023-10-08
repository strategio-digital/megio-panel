import { mdiDatabase, mdiHammerScrewdriver, mdiViewDashboard } from '@mdi/js'
import logo from '@/assets/img/strategio.svg'
import { COLLECTION_EMPTY_ROUTE } from '@/components/navbar/types/Constants'
import type INavbarSettings from '@/components/navbar/types/INavbarSettings'

const navbar: INavbarSettings = {
    brand: {
        title: 'Megio Panel',
        routeName: 'megio.view.dashboard',
        logo
    },
    items: [
        {
            title: 'Přehled',
            activePrefix: '/dashboard',
            icon: mdiViewDashboard,
            route: {
                name: 'megio.view.dashboard'
            }
        },
        {
            title: 'Kolekce',
            activePrefix: '/collections',
            icon: mdiDatabase,
            route: {
                name: 'megio.view.collections',
                params: {
                    name: COLLECTION_EMPTY_ROUTE
                }
            }
        },
        {
            title: 'Nastavení',
            activePrefix: '/settings',
            icon: mdiHammerScrewdriver,
            route: {
                name: 'megio.view.settings.admins'
            }
        }
    ]
}

export default navbar