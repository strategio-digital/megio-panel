<script setup lang="ts">
import { ref } from 'vue'
import { mdiMinus } from '@mdi/js'
import type IColumnProps from '@/components/datagrid/types/IColumnProps'

const props = defineProps<IColumnProps>()

const value = ref<{
    value: string,
    iso_8601: string,
    zone_id: string,
    utc_offset: string,
}>(props.value)
</script>

<template>
    <span v-if="value" :title="`Zone: ${value.zone_id} | UTC: ${value.utc_offset}`">
        {{ value.iso_8601 }}
    </span>
    <v-icon v-else :icon="mdiMinus" color="grey" size="sm" />
</template>