import RemoveModal from '@/components/datagrid/modal/RemoveModal.vue'
import type IDatagridSettings from '@/components/datagrid/types/IDatagridSettings'

const modals: IDatagridSettings['modals'] = [
    {
        onAction: 'remove',
        component: RemoveModal
    }
]

export default modals