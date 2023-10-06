import 'vuetify/styles'
import { md2 } from 'vuetify/blueprints'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import { type VuetifyOptions } from 'vuetify'
import { VApp, VLayout, VMain, VMenu, VNavigationDrawer, VSpacer, VDivider, VBreadcrumbs } from 'vuetify/components'
import { VBtn, VForm, VInput, VTextField, VSwitch, VCheckbox, VSelect } from 'vuetify/components'
import { VCard, VCardTitle, VCardActions, VCardText } from 'vuetify/components'
import { VIcon, VProgressCircular, VList, VListItem, VListItemTitle } from 'vuetify/components'
import { VTooltip, VChip, VBadge, VAlert } from 'vuetify/components'
import { VDialog, VTable, VPagination } from 'vuetify/components'

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
        VBtn, VForm, VInput, VTextField, VSwitch, VCheckbox, VSelect,
        VCard, VCardTitle, VCardActions, VCardText,
        VIcon, VProgressCircular, VList, VListItem, VListItemTitle,
        VTooltip, VChip, VBadge, VAlert,
        VDialog, VTable, VPagination
    }
}