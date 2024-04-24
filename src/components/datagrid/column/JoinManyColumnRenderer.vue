<script setup lang="ts">
import { mdiMinus } from '@mdi/js'
import type IColumnProps from '@/components/datagrid/types/IColumnProps'

defineProps<IColumnProps>()
</script>

<template>
    <v-chip-group v-if="Array.isArray(value) && value.length > 0">
        <v-chip
            inline
            density="compact"
            v-for="item in value"
            :key="item.value"
        >{{ item.label }}
        </v-chip>
    </v-chip-group>
    <v-icon v-else :icon="mdiMinus" color="grey" size="sm" />
</template>