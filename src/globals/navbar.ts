import type INavbarSettings from '@/components/navbar/types/INavbarSettings'
import logo from '@/assets/img/strategio.svg'
import { COLLECTION_EMPTY_ROUTE } from '@/components/navbar/types/Constants'

const navbar: INavbarSettings = {
    brand: {
        title: 'Megio Panel',
        routeName: 'saas.view.dashboard',
        logo
    },
    items: [
        {
            title: 'Přehled',
            activePrefix: '/dashboard',
            icon: 'mdi-view-dashboard',
            route: {
                name: 'saas.view.dashboard'
            }
        },
        {
            title: 'Kolekce',
            activePrefix: '/collections',
            icon: 'mdi-database',
            route: {
                name: 'saas.view.collections',
                params: {
                    name: COLLECTION_EMPTY_ROUTE
                }
            }
        },
        {
            title: 'Nastavení',
            activePrefix: '/settings',
            icon: 'mdi-hammer-screwdriver',
            route: {
                name: 'saas.view.settings.application'
            }
        }
    ]
}

export default navbar