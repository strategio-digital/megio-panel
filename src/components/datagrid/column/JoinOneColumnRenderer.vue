<script setup lang="ts">
import { mdiMinus } from '@mdi/js'
import type IColumnProps from '@/components/datagrid/types/IColumnProps'

defineProps<IColumnProps>()
</script>

<template>
    <v-chip
        v-if="value"
        inline
        density="compact"
        :key="value.value"
    >{{ value.label }}
    </v-chip>
    <v-icon v-else :icon="mdiMinus" color="grey" size="sm" />
</template>