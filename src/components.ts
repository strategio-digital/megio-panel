// Layout
import Layout from '@/components/layout/Layout.vue'
import PageHeading from '@/components/layout/PageHeading.vue'
import SideModal from '@/components/layout/SideModal.vue'

// Datagrid
import Datagrid from '@/components/datagrid/Datagrid.vue'
import DatagridForm from '@/components/datagrid/form/DatagridForm.vue'
import RemoveModal from '@/components/datagrid/modal/RemoveModal.vue'

// Columns
import CollectionDatagrid from '@/components/collection/CollectionDatagrid.vue'
import ArrayColumnRenderer from '@/components/datagrid/column/ArrayColumnRenderer.vue'
import BooleanColumnRenderer from '@/components/datagrid/column/BooleanColumnRenderer.vue'
import DateTimeIntervalColumnRenderer from '@/components/datagrid/column/DateTimeIntervalColumnRenderer.vue'
import DateTimeZoneColumnRenderer from '@/components/datagrid/column/DateTimeZoneColumnRenderer.vue'
import EmailColumnRenderer from '@/components/datagrid/column/EmailColumnRenderer.vue'
import JoinManyColumnRenderer from '@/components/datagrid/column/JoinManyColumnRenderer.vue'
import JoinOneColumnRenderer from '@/components/datagrid/column/JoinOneColumnRenderer.vue'
import JsonColumnRenderer from '@/components/datagrid/column/JsonColumnRenderer.vue'
import PhoneColumnRenderer from '@/components/datagrid/column/PhoneColumnRenderer.vue'
import StringColumnRenderer from '@/components/datagrid/column/StringColumnRenderer.vue'
import UnknownColumnRenderer from '@/components/datagrid/column/UnknownColumnRenderer.vue'
import UrlColumnRenderer from '@/components/datagrid/column/UrlColumnRenderer.vue'

// Fields
import DecimalFieldRenderer from '@/components/datagrid/field/DecimalFieldRenderer.vue'
import ArrayFieldRenderer from '@/components/datagrid/field/ArrayFieldRenderer.vue'
import DateTimeZoneFieldRenderer from '@/components/datagrid/field/DateTimeZoneFieldRenderer.vue'
import EmailFieldRenderer from '@/components/datagrid/field/EmailFieldRenderer.vue'
import HiddenFieldRenderer from '@/components/datagrid/field/HiddenFieldRenderer.vue'
import IntegerFieldRenderer from '@/components/datagrid/field/IntegerFieldRenderer.vue'
import JsonFieldRenderer from '@/components/datagrid/field/JsonFieldRenderer.vue'
import NumericFieldRenderer from '@/components/datagrid/field/NumericFieldRenderer.vue'
import PasswordFieldRenderer from '@/components/datagrid/field/PasswordFieldRenderer.vue'
import RichTextFieldRenderer from '@/components/datagrid/field/RichTextFieldRenderer.vue'
import SelectFieldRenderer from '@/components/datagrid/field/SelectFieldRenderer.vue'
import SlugFieldRenderer from '@/components/datagrid/field/SlugFieldRenderer.vue'
import TextAreaFieldRenderer from '@/components/datagrid/field/TextAreaFieldRenderer.vue'
import TextFieldRenderer from '@/components/datagrid/field/TextFieldRenderer.vue'
import ToggleBtnFieldRenderer from '@/components/datagrid/field/ToggleBtnFieldRenderer.vue'
import UnknownFieldRenderer from '@/components/datagrid/field/UnknownFieldRenderer.vue'
import type { Component } from 'vue'


interface IComponentMap {
    [key: string]: Component;
}

interface IComponents {
    layout: IComponentMap,
    collection: IComponentMap,
    datagrid: IComponentMap
}

const components: IComponents = {
    layout: {
        MLayout: Layout,
        MPageHeading: PageHeading,
        MSideModal: SideModal
    },
    collection: {
        MCollectionDatagrid: CollectionDatagrid
    },
    datagrid: {
        // datagrid
        MDatagrid: Datagrid,
        MDatagridForm: DatagridForm,
        MRemoveModal: RemoveModal,

        // column
        MArrayColumnRenderer: ArrayColumnRenderer,
        MBooleanColumnRenderer: BooleanColumnRenderer,
        MDateTimeIntervalColumnRenderer: DateTimeIntervalColumnRenderer,
        MDateTimeZoneColumnRenderer: DateTimeZoneColumnRenderer,
        MEmailColumnRenderer: EmailColumnRenderer,
        MJoinManyColumnRenderer: JoinManyColumnRenderer,
        MJoinOneColumnRenderer: JoinOneColumnRenderer,
        MJsonColumnRenderer: JsonColumnRenderer,
        MPhoneColumnRenderer: PhoneColumnRenderer,
        MStringColumnRenderer: StringColumnRenderer,
        MUnknownColumnRenderer: UnknownColumnRenderer,
        MUrlColumnRenderer: UrlColumnRenderer,

        // field
        MArrayFieldRenderer: ArrayFieldRenderer,
        MDateTimeZoneFieldRenderer: DateTimeZoneFieldRenderer,
        MDecimalFieldRenderer: DecimalFieldRenderer,
        MEmailFieldRenderer: EmailFieldRenderer,
        MHiddenFieldRenderer: HiddenFieldRenderer,
        MIntegerFieldRenderer: IntegerFieldRenderer,
        MJsonFieldRenderer: JsonFieldRenderer,
        MNumericFieldRenderer: NumericFieldRenderer,
        MPasswordFieldRenderer: PasswordFieldRenderer,
        MRichTextFieldRenderer: RichTextFieldRenderer,
        MSelectFieldRenderer: SelectFieldRenderer,
        MSlugFieldRenderer: SlugFieldRenderer,
        MTextAreaFieldRenderer: TextAreaFieldRenderer,
        MTextFieldRenderer: TextFieldRenderer,
        MToggleBtnFieldRenderer: ToggleBtnFieldRenderer,
        MUnknownFieldRenderer: UnknownFieldRenderer
    }
}

export default () => {
    return components
}