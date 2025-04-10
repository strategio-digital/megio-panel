import routes from '@/globals/routes'
import navbar from '@/globals/navbar'
import actions from '@/globals/datagrid/actions'
import columns from '@/globals/datagrid/columns'
import fields from '@/globals/datagrid/fields'
import modals from '@/globals/datagrid/modals'
import recipes from '@/globals/collection/recipes.ts'
import type { PanelGlobals } from '@/types'

export default function useGlobals(): PanelGlobals {
    return {
        routes,
        navbar,
        actions,
        columns,
        fields,
        modals,
        recipes
    }
}