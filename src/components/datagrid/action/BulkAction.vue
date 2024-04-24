<script setup lang="ts">
import type IDatagridAction from '@/components/datagrid/types/IDatagridAction'

export type Props = { bulkAction: IDatagridAction, count: number }
export type Emits = { (e: 'onBulkAction', type: string): void }

defineProps<Props>()
const emits = defineEmits<Emits>()
</script>

<template>
    <v-list-item :key="bulkAction.name" @click="emits('onBulkAction', bulkAction.name)">
        <v-list-item-title>
            {{ bulkAction.label }} ({{ count }}x)
        </v-list-item-title>
    </v-list-item>
</template>