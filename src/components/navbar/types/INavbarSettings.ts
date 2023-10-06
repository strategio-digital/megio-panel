import type INavbarItem from '@/components/navbar/types/INavbarItem'

export default interface INavbarSettings {
    brand: {
        title: string
        routeName: string
        logo: string
    },
    items: INavbarItem[]
}