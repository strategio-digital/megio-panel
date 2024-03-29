<script setup lang="ts">
import type IDatagridAction from '@/components/datagrid/types/IDatagridAction'

defineProps<{ bulkAction: IDatagridAction, count: number }>()

const emits = defineEmits<{
    (e: 'onBulkAction', type: string): void
}>()
</script>

<template>
    <v-list-item :key="bulkAction.name" @click="emits('onBulkAction', bulkAction.name)">
        <v-list-item-title>
            {{ bulkAction.label }} ({{ count }}x)
        </v-list-item-title>
    </v-list-item>
</template>