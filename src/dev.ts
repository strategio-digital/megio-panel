import { createMegioPanel, useGlobals } from './index'

const globals = useGlobals()

createMegioPanel('http://localhost:8090/', {
    navbar: {
        brand: globals.navbar.brand,
        items: globals.navbar.items
    }
})