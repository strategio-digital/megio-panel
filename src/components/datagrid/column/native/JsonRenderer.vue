<script setup lang="ts">
import { mdiMinus } from '@mdi/js'
import type { IRow, IColumnSchema, IColumnProp } from 'megio-api/types/collections'
import { computed } from 'vue'

const props = defineProps<{
    value: any
    columnIndex: number
    columnSchema: IColumnProp
    tableSchema: IColumnSchema
    row: IRow
}>()

const json = computed(() => {
    if (typeof props.value === 'string') {
        return props.value;
    }

    try {
        return JSON.stringify(props.value)
    } catch {
        return props.value
    }
})

</script>

<template>
    <span v-if="json">{{ json }}</span>
    <v-icon v-else :icon="mdiMinus" color="grey" size="sm"/>
</template>