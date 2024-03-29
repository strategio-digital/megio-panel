import 'vuetify/styles'
import { md2 } from 'vuetify/blueprints'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import { type VuetifyOptions } from 'vuetify'
import { VApp, VLayout, VMain, VMenu, VNavigationDrawer, VSpacer, VDivider, VBreadcrumbs } from 'vuetify/components'
import { VBtn, VBtnToggle, VForm, VInput, VTextField, VTextarea, VSwitch, VCheckbox, VSelect, VAutocomplete } from 'vuetify/components'
import { VCard, VCardTitle, VCardActions, VCardText } from 'vuetify/components'
import { VIcon, VProgressCircular, VList, VListItem, VListItemTitle } from 'vuetify/components'
import { VTooltip, VChip, VChipGroup, VBadge, VAlert } from 'vuetify/components'
import { VDialog, VTable, VPagination } from 'vuetify/components'
import { VContainer, VRow, VCol } from 'vuetify/components'

export const vuetifyOptions: VuetifyOptions = {
    blueprint: md2,
    directives,
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi
        }
    },
    components: {
        VApp, VLayout, VMain, VMenu, VNavigationDrawer, VSpacer, VDivider, VBreadcrumbs,
        VBtn, VBtnToggle, VForm, VInput, VTextarea, VTextField, VSwitch, VCheckbox, VSelect, VAutocomplete,
        VCard, VCardTitle, VCardActions, VCardText,
        VIcon, VProgressCircular, VList, VListItem, VListItemTitle,
        VTooltip, VChip, VChipGroup, VBadge, VAlert,
        VDialog, VTable, VPagination,
        VContainer, VRow, VCol,
    }
}