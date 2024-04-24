<script setup lang="ts">
import { mdiMinus } from '@mdi/js'
import type IColumnProps from '@/components/datagrid/types/IColumnProps'

defineProps<IColumnProps>()
</script>

<template>
    <a
        class="text-decoration-none"
        v-if="value"
        :href="`tel:${value}`"
        target="_blank"
    >{{ value }}</a>
    <v-icon v-else :icon="mdiMinus" color="grey" size="sm" />
</template>