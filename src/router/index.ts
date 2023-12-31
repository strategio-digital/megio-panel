import { megio } from 'megio-api'
import { createRouter as create, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useToast } from '@/components/toast/useToast'

const createRouter = (routes: RouteRecordRaw[], routeRoot: string) => {
    const router = create({ history: createWebHistory(routeRoot), routes })
    const toast = useToast()

    router.beforeEach((to, from, next) => {
        const user = megio.auth.user.get()
        const routeTo = to.name?.toString()

        // show 401 if user is logged in and route is 401
        if (user && routeTo === 'megio.view.401') {
            return next()
        }

        // redirect to dashboard if route does not exist
        if (! routeTo) {
            toast.add('You are trying to access non-existent route (404)', 'error')
            return next({ name: 'megio.view.dashboard' })
        }

        // redirect to dashboard if user is logged in & route is not public
        if (user && to.meta.auth === false) {
            return next({ name: 'megio.view.dashboard' })
        }

        // redirect to login page if user is not logged in and route is not public
        if (! user && to.meta.auth !== false) {
            return next({ name: 'megio.view.login' })
        }

        // redirect to 401 page if user is logged in but does not have the required resource
        if (user && ! megio.auth.user.hasResource(routeTo)) {
            const message = `This view-resource '${routeTo}' is not allowed for current user`
            toast.add(message, 'error', null)
            return next({ name: 'megio.view.401' })
        }

        return next()
    })

    return router
}

export default createRouter
