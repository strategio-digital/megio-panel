import UnknownRenderer from '@/components/datagrid/column/native/UnknownRenderer.vue'
import BooleanRenderer from '@/components/datagrid/column/native/BooleanRenderer.vue'
import StringRenderer from '@/components/datagrid/column/native/StringRenderer.vue'
import DateTimeIntervalRenderer from '@/components/datagrid/column/native/DateTimeIntervalRenderer.vue'
import DateTimeZoneRenderer from '@/components/datagrid/column/native/DateTimeZoneRenderer.vue'
import EmailRenderer from '@/components/datagrid/column/native/EmailRenderer.vue'
import PhoneRenderer from '@/components/datagrid/column/native/PhoneRenderer.vue'
import UrlRenderer from '@/components/datagrid/column/native/UrlRenderer.vue'
import type IDatagridSettings from '@/components/datagrid/types/IDatagridSettings'

const columns: IDatagridSettings['columns'] = [
    {
        // Fallback if PHP cant recognize the column type
        rendererName: 'unknown-column-renderer',
        component: UnknownRenderer
    },
    {
        // String renderer & also default renderer (if PHP renderer-name is different than the ones below)
        rendererName: 'string-column-renderer',
        component: StringRenderer
    },
    {
        rendererName: 'boolean-column-renderer',
        component: BooleanRenderer
    },
    {
        rendererName: 'date-time-interval-cz-column-renderer',
        component: DateTimeIntervalRenderer
    },
    {
        rendererName: 'date-time-zone-column-renderer',
        component: DateTimeZoneRenderer
    },
    {
        rendererName: 'date-time-zone-cz-column-renderer',
        component: DateTimeZoneRenderer
    },
    {
        rendererName: 'email-column-renderer',
        component: EmailRenderer
    },
    {
        rendererName: 'phone-column-renderer',
        component: PhoneRenderer
    },
    {
        rendererName: 'url-column-renderer',
        component: UrlRenderer
    },
    {
        rendererName: 'video-link-column-renderer',
        component: UrlRenderer
    },
    {
        rendererName: 'json-column-renderer',
        component: UrlRenderer
    }
]

export default columns