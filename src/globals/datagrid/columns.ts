import StringRenderer from '@/components/datagrid/column/native/StringRenderer.vue'
import BooleanRenderer from '@/components/datagrid/column/native/BooleanRenderer.vue'
import UnknownRenderer from '@/components/datagrid/column/native/UnknownRenderer.vue'
import DateTimeRenderer from '@/components/datagrid/column/native/DateTimeRenderer.vue'
import NumberRenderer from '@/components/datagrid/column/native/NumberRenderer.vue'
import CBlobRenderer from '@/components/datagrid/column/native/CBlobRenderer.vue'
import type IDatagridSettings from '@/components/datagrid/types/IDatagridSettings'

const columns: IDatagridSettings['columns'] = [
    {
        types: ['@unknown', 'blob'],
        component: UnknownRenderer
    },
    {
        types: ['boolean', 'bool'],
        component: BooleanRenderer
    },
    {
        types: ['int', 'integer', 'smallint', 'float', 'decimal', 'bigint'],
        component: NumberRenderer
    },
    {
        types: ['guid', 'string', 'text'],
        component: StringRenderer
    },
    {
        types: ['datetime', 'datetimez', 'date', 'time'],
        component: DateTimeRenderer
    },
    {
        types: ['object', 'array', 'simple_array', 'json_array', 'json'],
        component: CBlobRenderer
    },
]

export default columns