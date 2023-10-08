import type { RouteRecordRaw } from 'vue-router'
import type INavbarSettings from '@/components/navbar/types/INavbarSettings'
import type ICollectionSettings from '@/components/collection/types/ICollectionSettings'
import type IDatagridSettings from '@/components/datagrid/types/IDatagridSettings'
import type IVersions from '@/components/version/IVersions'

type PanelOptions = {
    root?: string
    routes?: RouteRecordRaw[]
    navbar?: INavbarSettings
    datagrid?: IDatagridSettings
    collection?: ICollectionSettings
}

export type { PanelOptions, RouteRecordRaw, INavbarSettings, ICollectionSettings, IDatagridSettings, IVersions }