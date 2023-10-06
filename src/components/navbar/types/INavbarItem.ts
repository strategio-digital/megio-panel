import { type RouteLocationNamedRaw } from 'vue-router'

export default interface INavbarItem {
    title: string,
    activePrefix: string,
    icon: string,
    route: RouteLocationNamedRaw,
}