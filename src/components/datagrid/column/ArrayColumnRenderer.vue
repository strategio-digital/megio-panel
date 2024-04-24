<script setup lang="ts">
import { mdiMinus } from '@mdi/js'
import type IColumnProps from '@/components/datagrid/types/IColumnProps'

defineProps<IColumnProps>()
</script>

<template>
    <v-chip-group v-if="Array.isArray(value) && value.length > 0">
        <v-chip
            v-for="(item, key) in value"
            :key="key"
            rounded
        >{{ item }}
        </v-chip>
    </v-chip-group>
    <v-icon v-else :icon="mdiMinus" color="grey" size="sm" />
</template>