<script setup lang="ts">
import { mdiMinus } from '@mdi/js'
import type IColumnProps from '@/components/datagrid/types/IColumnProps'

defineProps<IColumnProps>()
</script>

<template>
    <span v-if="value || value === 0 || value === 0.0">{{ value }}</span>
    <v-icon v-else :icon="mdiMinus" color="grey" size="sm"/>
</template>