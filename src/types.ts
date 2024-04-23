import type { Component } from 'vue'
import type { Router, RouteRecordRaw } from 'vue-router'
import type INavbarSettings from '@/components/navbar/types/INavbarSettings'
import type ICollectionSettings from '@/components/collection/types/ICollectionSettings'
import type IDatagridSettings from '@/components/datagrid/types/IDatagridSettings'
import type IVersions from '@/components/version/IVersions'
import type ICollectionSummary from '@/components/collection/types/ICollectionSummary'

type PanelOptions = {
    root?: string
    routes?: RouteRecordRaw[]
    navbar?: INavbarSettings
    datagrid?: IDatagridSettings
    collection?: ICollectionSettings
}

type PanelGlobals = {
    routes: RouteRecordRaw[],
    navbar: INavbarSettings,
    actions: IDatagridSettings['actions'],
    columns: IDatagridSettings['columns'],
    fields: IDatagridSettings['fields'],
    modals: IDatagridSettings['modals'],
    summaries: (router: Router) => ICollectionSummary[]
}

type ComponentMap = {
    [key: string]: Component
}

type Components = {
    layout: ComponentMap,
    collection: ComponentMap,
    datagrid: ComponentMap
}

type Toast = {
    add: (message: string, color: 'error' | 'success' | 'warning', timeout?: number | null) => void
}

export type {
    PanelOptions,
    PanelGlobals,
    RouteRecordRaw,
    INavbarSettings,
    ICollectionSettings,
    IDatagridSettings,
    IVersions,
    Components,
    Toast
}