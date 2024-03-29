import type IDatagridAction from '@/components/datagrid/types/IDatagridAction'
import type IDatagridModal from '@/components/datagrid/types/IDatagridModal'
import type IDatagridColumn from '@/components/datagrid/types/IDatagridColumn'
import type IDatagridField from '@/components/datagrid/types/IDatagridField'

export default interface IDatagridSettings {
    modals: IDatagridModal[]
    columns: IDatagridColumn[]
    fields: IDatagridField[]
    actions: {
        row: IDatagridAction[],
        bulk: IDatagridAction[]
    },
}