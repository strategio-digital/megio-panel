<script setup lang="ts">
import { computed, ref } from 'vue'
import { mdiSort, mdiSortAscending, mdiSortDescending } from '@mdi/js'
import type { ColumnProp, OrderBy } from 'megio-api/types/collections'

export type Props = { col: ColumnProp }
export type Emits = {
    (e: 'onColumnSort', orderBy: OrderBy[]): void
    (e: 'onColumnSortReset', col: ColumnProp): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const orderBy = ref<OrderBy[]>(props.col.orderBy)
const currentOrderBy = computed<OrderBy | null>(() => orderBy.value.find(o => o.col === props.col.key) || null)
const desc = computed<boolean>(() => currentOrderBy.value?.desc || false)

function onColumnThClick() {
    if (props.col.sortable) {
        onColumnSort(props.col.key)
    }
}

function onColumnSort(colName: string) {
    if (currentOrderBy.value?.col === colName) {
        if (currentOrderBy.value?.desc === false) {
            orderBy.value = []
            emits('onColumnSortReset', props.col)
        } else {
            orderBy.value = [{ col: colName, desc: false }]
            emits('onColumnSort', orderBy.value)
        }
    } else {
        orderBy.value = [{ col: colName, desc: true }]
        emits('onColumnSort', orderBy.value)
    }
}
</script>

<template>
    <th
        @click="onColumnThClick"
        :class="[
            'text-body-2x',
            currentOrderBy ? 'bg-grey-lighten-5' : '',
            col.sortable ? 'cursor-pointer' : '',
            ['boolean'].includes(col.renderer) ? 'text-center' : 'text-start'
        ]"
    >
        <div class="d-flex align-center justify-space-between">
            <span style="line-height: 1">
                {{
                    col.name
                    .replace(/([A-Z]+)*([A-Z][a-z])/g, '$1 $2')
                    .replace(/^_+|_+$/g, '')
                    .toUpperCase()
                }}
            </span>
            <v-icon
                v-if="col.sortable"
                :icon="currentOrderBy?.col === col.key ? (desc ? mdiSortDescending : mdiSortAscending) : mdiSort"
                :color="currentOrderBy?.col === col.key ? 'primary' : 'grey'"
                class="ms-2"
                :size="20"
            />
        </div>
    </th>
</template>