import { createMegioPanel, useGlobals } from './index'
import { INavbarSettings } from './types'

const globals = useGlobals()

const brand: INavbarSettings['brand'] = {
    title: 'Your brand name',
    routeName: 'megio.view.dashboard',
    logo: globals.navbar.brand
}

createMegioPanel('http://localhost:8090/', {
    navbar: {
        brand,
        items: globals.navbar.items
    }
})