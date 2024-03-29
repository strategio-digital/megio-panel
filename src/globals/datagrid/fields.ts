import UnknownFieldRenderer from '@/components/datagrid/field/UnknownFieldRenderer.vue'
import TextFieldRenderer from '@/components/datagrid/field/TextFieldRenderer.vue'
import SelectFieldRenderer from '@/components/datagrid/field/SelectFieldRenderer.vue'
import HiddenFieldRenderer from '@/components/datagrid/field/HiddenFieldRenderer.vue'
import DecimalFieldRenderer from '@/components/datagrid/field/DecimalFieldRenderer.vue'
import IntegerFieldRenderer from '@/components/datagrid/field/IntegerFieldRenderer.vue'
import NumericFieldRenderer from '@/components/datagrid/field/NumericFieldRenderer.vue'
import PasswordFieldRenderer from '@/components/datagrid/field/PasswordFieldRenderer.vue'
import TextAreaFieldRenderer from '@/components/datagrid/field/TextAreaFieldRenderer.vue'
import JsonFieldRenderer from '@/components/datagrid/field/JsonFieldRenderer.vue'
import ToggleBtnFieldRenderer from '@/components/datagrid/field/ToggleBtnFieldRenderer.vue'
import ArrayFieldRenderer from '@/components/datagrid/field/ArrayFieldRenderer.vue'
import SlugFieldRenderer from '@/components/datagrid/field/SlugFieldRenderer.vue'
import RichTextFieldRenderer from '@/components/datagrid/field/RichTextFieldRenderer.vue'
import EmailFieldRenderer from '@/components/datagrid/field/EmailFieldRenderer.vue'
import type IDatagridSettings from '@/components/datagrid/types/IDatagridSettings'
import DateTimeZoneFieldRenderer from '@/components/datagrid/field/DateTimeZoneFieldRenderer.vue'

const fields: IDatagridSettings['fields'] = [
    {
        // Fallback if PHP cant recognize the field type
        rendererName: 'unknown-field-renderer',
        component: UnknownFieldRenderer
    },
    {
        // Text renderer & also default renderer (if PHP renderer-name is different than the ones below)
        rendererName: 'text-field-renderer',
        component: TextFieldRenderer
    },
    {
        rendererName: 'select-field-renderer',
        component: SelectFieldRenderer
    },
    {
        rendererName: 'hidden-field-renderer',
        component: HiddenFieldRenderer
    },
    {
        rendererName: 'decimal-field-renderer',
        component: DecimalFieldRenderer
    },
    {
        rendererName: 'integer-field-renderer',
        component: IntegerFieldRenderer
    },
    {
        rendererName: 'numeric-field-renderer',
        component: NumericFieldRenderer
    },
    {
        rendererName: 'password-field-renderer',
        component: PasswordFieldRenderer
    },
    {
        rendererName: 'textarea-field-renderer',
        component: TextAreaFieldRenderer
    },
    {
        rendererName: 'rich-text-field-renderer',
        component: RichTextFieldRenderer
    },
    {
        rendererName: 'toggle-btn-field-renderer',
        component: ToggleBtnFieldRenderer
    },
    {
        rendererName: 'json-field-renderer',
        component: JsonFieldRenderer
    },
    {
        rendererName: 'array-field-renderer',
        component: ArrayFieldRenderer
    },
    {
        rendererName: 'slug-field-renderer',
        component: SlugFieldRenderer
    },
    {
        rendererName: 'email-field-renderer',
        component: EmailFieldRenderer
    },
    {
        rendererName: 'date-time-zone-field-renderer',
        component: DateTimeZoneFieldRenderer
    }
]

export default fields