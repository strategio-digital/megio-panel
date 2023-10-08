import routes from '@/globals/routes'
import navbar from '@/globals/navbar'
import actions from '@/globals/datagrid/actions'
import columns from '@/globals/datagrid/columns'
import modals from '@/globals/datagrid/modals'
import summaries from '@/globals/collection/summaries'
import type { PanelGlobals } from '@/types'

export default function getGlobals(): PanelGlobals {
    return {
        routes,
        navbar,
        actions,
        columns,
        modals,
        summaries
    }
}