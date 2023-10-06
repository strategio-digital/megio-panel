import type IDatagridAction from '@/components/datagrid/types/IDatagridAction'
import type IDatagridModal from '@/components/datagrid/types/IDatagridModal'
import type IDatagridColumn from '@/components/datagrid/types/IDatagridColumn'

export default interface IDatagridSettings {
    modals: IDatagridModal[]
    columns: IDatagridColumn[]
    actions: {
        row: IDatagridAction[],
        bulk: IDatagridAction[]
    },
}