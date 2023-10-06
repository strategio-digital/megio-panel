<script setup lang="ts">
import { type IRow } from '@/api/collections/types/IRow'
import type IDatagridAction from '@/components/datagrid/types/IDatagridAction'

defineProps<{ row: IRow, rowAction: IDatagridAction }>()

const emits = defineEmits<{
    (e: 'onRowAction', row: IRow, type: string): void
}>()

</script>

<template>
    <v-list-item @click="emits('onRowAction', row, rowAction.name)">
        <v-list-item-title>{{ rowAction.label }}</v-list-item-title>
    </v-list-item>
</template>
