<script setup lang="ts">
import type { IRow } from 'megio-api/types/collections'
import type IDatagridAction from '@/components/datagrid/types/IDatagridAction'

export type Props = { row: IRow, rowAction: IDatagridAction }
export type Emits = { (e: 'onRowAction', row: IRow, type: string): void }

defineProps<Props>()
const emits = defineEmits<Emits>()
</script>

<template>
    <v-list-item @click="emits('onRowAction', row, rowAction.name)">
        <v-list-item-title>{{ rowAction.label }}</v-list-item-title>
    </v-list-item>
</template>
