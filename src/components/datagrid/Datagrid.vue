<script setup lang="ts">
import { type Component as VueComponent, type ComputedRef } from 'vue'
import { ref, onUpdated, onMounted, inject, computed } from 'vue'
import { mdiArrowRight, mdiChevronDown, mdiDotsVertical, mdiMinus } from '@mdi/js'
import { useRouter } from 'vue-router'
import { useTheme } from '@/components/theme/useTheme'
import RowAction from '@/components/datagrid/action/RowAction.vue'
import BulkAction from '@/components/datagrid/action/BulkAction.vue'
import UnknownRenderer from '@/components/datagrid/column/native/UnknownRenderer.vue'
import { type IRow } from '@/api/collections/types/IRow'
import { type IPagination } from '@/api/collections/types/IPagination'
import { type IResp } from '@/api/collections/crud/show'
import { type ISchemaProp } from '@/api/collections/types/ISchemaProp'
import type IDatagridAction from '@/components/datagrid/types/IDatagridAction'
import type IDatagridSettings from '@/components/datagrid/types/IDatagridSettings'

defineExpose({ refresh })

const props = defineProps<{
    defaultItemsPerPage: number
    emptyDataMessage: string
    bulkActions: IDatagridAction[]
    rowActions: IDatagridAction[]
    loadFunction: (pagination: IPagination) => Promise<IResp>
    allowActionsFiltering?: boolean,
    loading?: boolean
}>()

const emits = defineEmits<{
    (e: 'onRowAction', row: IRow, type: string): void
    (e: 'onBulkAction', rows: IRow[], type: string): void
    (e: 'onFirstColumnClick', row: IRow): void
    (e: 'onPaginationChange', pagination: IPagination): void
    (e: 'onAcceptModalSucceeded'): void
}>()


const router = useRouter()
const { isDark } = useTheme();
const modalRenderers: IDatagridSettings['modals'] | undefined = inject('datagrid-modals')
const columnRenderers: IDatagridSettings['columns'] | undefined = inject('datagrid-columns')

const modal = ref<string | null>(null)
const selected = ref<IRow[]>([])
const multiselectChecked = ref<boolean>(false)

const visibleColumns = ref<string[]>([])
const data = ref<IResp['data']>({
    items: [],
    pagination: {
        currentPage: 1,
        itemsPerPage: props.defaultItemsPerPage,
        lastPage: 0,
        itemsCountAll: 0
    }
})

const allowedBulkActions = computed(() => filterAllowedActions(props.bulkActions))
const allowedRowActions = computed(() => filterAllowedActions(props.rowActions))
const columnFields: ComputedRef<ISchemaProp[]> = computed(() => data.value.schema?.props.filter(item => visibleColumns.value.includes(item.name)) || [])

async function refresh(newPagination: IPagination | null = null) {
    if (! newPagination) {
        selected.value = []
    }

    newPagination = newPagination || data.value.pagination
    const resp = await props.loadFunction(newPagination)
    if (resp.success && resp.data.schema) {
        data.value = resp.data
        if (visibleColumns.value.length === 0) {
            const dbColNames = resp.data.schema.props.map(prop => prop.name)
            visibleColumns.value = dbColNames.filter(col => !resp.data.schema?.meta.invisible.includes(col))
        }
    }
}

async function onPaginationChange(newPage: number) {
    await refresh({ ...data.value.pagination, currentPage: newPage })
    emits('onPaginationChange', data.value.pagination)
}

async function onItemsPerPageChange(newItems: number) {
    await refresh({
        ...data.value.pagination,
        currentPage: 1,
        itemsPerPage: newItems
    })
}

async function onAcceptModalSucceeded() {
    modal.value = null
    selected.value = []
    multiselectChecked.value = false

    const prevData = data.value
    await refresh(data.value.pagination)

    if (prevData.pagination.currentPage > data.value.pagination.lastPage && prevData.pagination.currentPage !== 1) {
        await onPaginationChange(data.value.pagination.lastPage)
    }

    emits('onAcceptModalSucceeded')
}

function onRowAction(row: IRow, type: string) {
    modal.value = type
    selected.value = [row]
    emits('onRowAction', row, type)
}

function onBulkAction(type: string) {
    modal.value = type
    emits('onBulkAction', selected.value, type)
}

function onFirstColumnClick(row: IRow) {
    emits('onFirstColumnClick', row)
}

function onModalCancel() {
    modal.value = null
}

function onUnselectAll() {
    selected.value = []
}

function onSelectAll() {
    // Add items
    if (multiselectChecked.value === false) {
        const newItems = data.value.items.filter(item => ! selected.value.includes(item))
        selected.value.push(...newItems)
    }

    // Remove items
    if (multiselectChecked.value === true) {
        const ids = data.value.items.map(item => item.id)
        selected.value = selected.value.filter(sel => ! ids.includes(sel.id))
    }
}

function resolveMultiselect() {
    const ids = data.value.items.map(item => item.id)
    const items = selected.value.filter(item => ids.includes(item.id))
    multiselectChecked.value = ids.length === items.length && items.length !== 0
}

function filterAllowedActions(actions: IDatagridAction[]): IDatagridAction[] {
    if (! props.allowActionsFiltering) {
        return actions
    }

    const currentPath = router.currentRoute.value.fullPath

    return actions.map(action => {
        return {
            ...action,
            show: action.showOn.filter(show => currentPath.startsWith(show)).length !== 0
        }
    }).filter(action => action.show)
}

function columnRenderer(columnType: string): VueComponent {
    const column = columnRenderers?.filter(col => col.types.includes(columnType)).shift()

    if (column) {
        return column.component
    }

    return UnknownRenderer
}

onMounted(() => refresh(data.value.pagination))

onUpdated(() => resolveMultiselect())
</script>

<template>
    <div>
        <!-- dynamic rendered modals -->
        <component
            v-if="data.schema && modalRenderers"
            v-for="m in modalRenderers" :key="m.onAction"
            :is="m.component"
            :collection="data.schema.meta.table"
            :open="modal === m.onAction"
            :rows="selected"
            @onCancel="onModalCancel"
            @onAccept="onAcceptModalSucceeded"
        />

        <!-- table -->
        <v-table density="default" :hover="true" v-if="data.items.length && data.schema">
            <thead>
            <tr class="text-no-wrap">
                <!-- bulk actions -->
                <th class="d-flex align-center">
                    <!-- select all -->
                    <div class="me-2">
                        <v-checkbox
                            v-model="multiselectChecked"
                            @click="onSelectAll"
                            color="primary"
                            class="d-flex"
                        />
                    </div>

                    <!-- bulk actions -->
                    <v-menu v-if="loading === false">
                        <template v-slot:activator="{ props }">
                            <v-btn
                                v-bind="props"
                                rounded="xl"
                                size="small"
                                :variant="selected.length ? 'tonal' : 'plain'"
                                :disabled="!selected.length"
                            >
                                <v-icon :icon="mdiChevronDown" />
                                <span>{{ selected.length }}</span>
                            </v-btn>
                        </template>
                        <v-list>
                            <BulkAction
                                v-for="action in allowedBulkActions"
                                :v-key="action.name"
                                :bulkAction="action"
                                :count="selected.length"
                                @onBulkAction="onBulkAction"
                            />
                            <BulkAction
                                :bulk-action="{ label: 'Zrušit označení', name: '', showOn:[] }"
                                :count="selected.length"
                                @onBulkAction="onUnselectAll"
                            />
                        </v-list>
                    </v-menu>
                </th>

                <!-- dynamic column names -->
                <template v-for="col in columnFields" :key="col.name">
                    <th :class="[['bool', 'boolean'].includes(col.type) ? 'text-center' : 'text-start']" class="text-body-2">
                        {{ col.name.replace(/([A-Z]+)*([A-Z][a-z])/g, "$1 $2").toUpperCase() }}
                    </th>
                </template>

                <!-- datagrid settings -->
                <th class="text-right">
                    <v-menu :close-on-content-click="false" v-if="loading === false">
                        <template v-slot:activator="{ props }">
                            <v-btn
                                :icon="mdiDotsVertical"
                                v-bind="props"
                                size="small"
                                variant="plain"
                            ></v-btn>
                        </template>

                        <!-- change items per page -->
                        <v-card min-width="300">
                            <v-list>
                                <v-list-item>
                                    <v-select
                                        class="my-2"
                                        hide-details
                                        @update:model-value="onItemsPerPageChange"
                                        :model-value="data.pagination.itemsPerPage"
                                        :items="[10, 15, 25, 50, 100, 250, 500]"
                                        variant="outlined"
                                        density="compact"
                                        label="Počet položek na stránku"
                                    ></v-select>
                                </v-list-item>
                            </v-list>

                            <v-divider></v-divider>

                            <div class="px-5 py-3">
                                <span class="text-grey">Zobrazit sploupce</span>
                                <v-switch
                                    v-for="col in data.schema.props"
                                    :label="col.name"
                                    color="purple"
                                    density="compact"
                                    v-model="visibleColumns"
                                    :value="col.name"
                                    hide-details
                                ></v-switch>
                            </div>
                        </v-card>
                    </v-menu>
                </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in data.items">
                <!-- checkbox for bulk actions -->
                <td :class="{'text-grey' : isDark, 'text-grey-darken-3' : !isDark }">
                    <v-checkbox
                        v-model="selected"
                        :value="item"
                        :value-comparator="(a, b) => a.id === b.id"
                        color="primary"
                        class="d-flex"
                    ></v-checkbox>
                </td>

                <!-- dynamic column values -->
                <template v-for="(col, colIdx) in columnFields" :key="col.name + '_' + item.id">
                    <td
                        class="text-no-wrap text-body-2"
                        :class="{'text-grey' : isDark && colIdx !== 0, 'text-indigo-accent-2 text-decoration-underline' : colIdx === 0}"
                        :style="{cursor: colIdx === 0 ? 'pointer' : undefined}"
                        @click.prevent="colIdx === 0 && onFirstColumnClick(item)"
                    >
                        <component
                            v-if="item[col.name] !== undefined"
                            :is="columnRenderer(col.type)"
                            :value="item[col.name]"
                            :columnIndex="colIdx"
                            :columnSchema="col"
                            :tableSchema="data.schema"
                            :row="item"
                        />
                        <div v-else>
                            <v-icon :icon="mdiMinus" color="grey" size="sm" />
                        </div>
                    </td>
                </template>

                <!-- row actions -->
                <td class="text-right text-no-wrap">
                    <v-menu v-if="loading === false">
                        <template v-slot:activator="{ props }">
                            <v-btn :icon="mdiChevronDown" v-bind="props" size="small" variant="plain"></v-btn>
                        </template>
                        <v-list>
                            <RowAction
                                v-for="action in allowedRowActions"
                                :v-key="action.name"
                                :row="item"
                                :rowAction="action"
                                @onRowAction="onRowAction"
                            />
                        </v-list>
                    </v-menu>
                    <v-btn :icon="mdiArrowRight" variant="plain" size="small" @click="onFirstColumnClick(item)" />
                </td>
            </tr>
            </tbody>
        </v-table>

        <div v-if="!data.items.length" class="d-flex justify-center align-center">
            <div class="border-0 border-t border-dashed w-100 py-5 mt-5 text-center">{{ emptyDataMessage }}</div>
        </div>

        <!-- pagination -->
        <v-pagination
            @update:model-value="onPaginationChange"
            v-if="data.items.length"
            :length="data.pagination.lastPage"
            :total-visible="6"
            class="mt-5"
        />
    </div>
</template>