import type { Ref } from 'vue'
import type { Router, RouteRecordRaw } from 'vue-router'
import type INavbarSettings from '@/components/navbar/types/INavbarSettings'
import type ICollectionSettings from '@/components/collection/types/ICollectionSettings'
import type IDatagridSettings from '@/components/datagrid/types/IDatagridSettings'
import type IVersions from '@/components/version/IVersions'
import type ICollectionSummary from '@/components/collection/types/ICollectionSummary'
import type { IFormProp, IRespCreate, IRespUpdate } from 'megio-api/types/collections'

export type {
    PanelOptions,
    PanelGlobals,
    RouteRecordRaw,
    INavbarSettings,
    ICollectionSettings,
    IDatagridSettings,
    IVersions,
    IVuetifyComponents,
    IMegioComponents,
    IToast,
    ICreateForm,
    IUpdateForm,
    ICreateFormParams
}

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

interface IToast {
    add: (message: string, color: 'error' | 'success' | 'warning', timeout?: number | null) => void
}

interface ICreateForm {
    loading: Ref<boolean>
    formSchema: Ref<IFormProp[]>
    collectionName: Ref<string>
    load: () => Promise<void>
    save: (data: Record<string, any>) => Promise<IRespCreate>
    handleClickBack: () => Promise<void>
}

interface ICreateFormParams {
    recipe: string,
    onSave?: (data: IRespCreate['data']) => void
}

interface IUpdateForm extends ICreateForm {
    save: (data: Record<string, any>) => Promise<IRespUpdate>,
}

interface IMegioComponents {
    MLayout: typeof import('@/components/layout/Layout.vue')['default'],
    MPageHeading: typeof import('@/components/layout/PageHeading.vue')['default'],
    MSideModal: typeof import('@/components/layout/SideModal.vue')['default'],
    MCollectionDatagrid: typeof import('@/components/collection/CollectionDatagrid.vue')['default'],
    MDatagrid: typeof import('@/components/datagrid/Datagrid.vue')['default'],
    MDatagridForm: typeof import('@/components/datagrid/form/DatagridForm.vue')['default'],
    MRemoveModal: typeof import('@/components/datagrid/modal/RemoveModal.vue')['default'],
    MArrayColumnRenderer: typeof import('@/components/datagrid/column/ArrayColumnRenderer.vue')['default'],
    MBooleanColumnRenderer: typeof import('@/components/datagrid/column/BooleanColumnRenderer.vue')['default'],
    MDateTimeIntervalColumnRenderer: typeof import('@/components/datagrid/column/DateTimeIntervalColumnRenderer.vue')['default'],
    MDateTimeZoneColumnRenderer: typeof import('@/components/datagrid/column/DateTimeZoneColumnRenderer.vue')['default'],
    MEmailColumnRenderer: typeof import('@/components/datagrid/column/EmailColumnRenderer.vue')['default'],
    MJoinManyColumnRenderer: typeof import('@/components/datagrid/column/JoinManyColumnRenderer.vue')['default'],
    MJoinOneColumnRenderer: typeof import('@/components/datagrid/column/JoinOneColumnRenderer.vue')['default'],
    MJsonColumnRenderer: typeof import('@/components/datagrid/column/JsonColumnRenderer.vue')['default'],
    MPhoneColumnRenderer: typeof import('@/components/datagrid/column/PhoneColumnRenderer.vue')['default'],
    MStringColumnRenderer: typeof import('@/components/datagrid/column/StringColumnRenderer.vue')['default'],
    MUnknownColumnRenderer: typeof import('@/components/datagrid/column/UnknownColumnRenderer.vue')['default'],
    MUrlColumnRenderer: typeof import('@/components/datagrid/column/UrlColumnRenderer.vue')['default'],
    MArrayFieldRenderer: typeof import('@/components/datagrid/field/ArrayFieldRenderer.vue')['default'],
    MDateTimeZoneFieldRenderer: typeof import('@/components/datagrid/field/DateTimeZoneFieldRenderer.vue')['default'],
    MDecimalFieldRenderer: typeof import('@/components/datagrid/field/DecimalFieldRenderer.vue')['default'],
    MEmailFieldRenderer: typeof import('@/components/datagrid/field/EmailFieldRenderer.vue')['default'],
    MHiddenFieldRenderer: typeof import('@/components/datagrid/field/HiddenFieldRenderer.vue')['default'],
    MIntegerFieldRenderer: typeof import('@/components/datagrid/field/IntegerFieldRenderer.vue')['default'],
    MJsonFieldRenderer: typeof import('@/components/datagrid/field/JsonFieldRenderer.vue')['default'],
    MNumericFieldRenderer: typeof import('@/components/datagrid/field/NumericFieldRenderer.vue')['default'],
    MPasswordFieldRenderer: typeof import('@/components/datagrid/field/PasswordFieldRenderer.vue')['default'],
    MRichTextFieldRenderer: typeof import('@/components/datagrid/field/RichTextFieldRenderer.vue')['default'],
    MSelectFieldRenderer: typeof import('@/components/datagrid/field/SelectFieldRenderer.vue')['default'],
    MSlugFieldRenderer: typeof import('@/components/datagrid/field/SlugFieldRenderer.vue')['default'],
    MTextAreaFieldRenderer: typeof import('@/components/datagrid/field/TextAreaFieldRenderer.vue')['default'],
    MTextFieldRenderer: typeof import('@/components/datagrid/field/TextFieldRenderer.vue')['default'],
    MToggleBtnFieldRenderer: typeof import('@/components/datagrid/field/ToggleBtnFieldRenderer.vue')['default'],
    MUnknownFieldRenderer: typeof import('@/components/datagrid/field/UnknownFieldRenderer.vue')['default'],
}

interface IVuetifyComponents {
    VApp: typeof import('vuetify/components')['VApp']
    VAutocomplete: typeof import('vuetify/components')['VAutocomplete']
    VAlert: typeof import('vuetify/components')['VAlert']
    VBadge: typeof import('vuetify/components')['VBadge']
    VBreadcrumbs: typeof import('vuetify/components')['VBreadcrumbs']
    VBtn: typeof import('vuetify/components')['VBtn']
    VBtnToggle: typeof import('vuetify/components')['VBtnToggle']
    VCard: typeof import('vuetify/components')['VCard']
    VCardActions: typeof import('vuetify/components')['VCardActions']
    VCardText: typeof import('vuetify/components')['VCardText']
    VCardTitle: typeof import('vuetify/components')['VCardTitle']
    VCheckbox: typeof import('vuetify/components')['VCheckbox']
    VChip: typeof import('vuetify/components')['VChip']
    VChipGroup: typeof import('vuetify/components')['VChipGroup']
    VDialog: typeof import('vuetify/components')['VDialog']
    VDivider: typeof import('vuetify/components')['VDivider']
    VIcon: typeof import('vuetify/components')['VIcon']
    VInput: typeof import('vuetify/components')['VInput']
    VList: typeof import('vuetify/components')['VList']
    VListItem: typeof import('vuetify/components')['VListItem']
    VListItemTitle: typeof import('vuetify/components')['VListItemTitle']
    VMain: typeof import('vuetify/components')['VMain']
    VMenu: typeof import('vuetify/components')['VMenu']
    VNavigationDrawer: typeof import('vuetify/components')['VNavigationDrawer']
    VPagination: typeof import('vuetify/components')['VPagination']
    VProgressCircular: typeof import('vuetify/components')['VProgressCircular']
    VSelect: typeof import('vuetify/components')['VSelect']
    VSwitch: typeof import('vuetify/components')['VSwitch']
    VTextField: typeof import('vuetify/components')['VTextField']
    VTextarea: typeof import('vuetify/components')['VTextarea']
    VTable: typeof import('vuetify/components')['VTable']
    VTooltip: typeof import('vuetify/components')['VTooltip']
    VForm: typeof import('vuetify/components')['VForm']
    VContainer: typeof import('vuetify/components')['VContainer']
    VCol: typeof import('vuetify/components')['VCol']
    VRow: typeof import('vuetify/components')['VRow']
    VSpacer: typeof import('vuetify/components')['VSpacer']
    VLayout: typeof import('vuetify/components')['VLayout']
}


