<script setup lang="ts">
import { computed } from 'vue'
import { mdiMinus } from '@mdi/js'
import type IColumnProps from '@/components/datagrid/types/IColumnProps'

const props = defineProps<IColumnProps>()

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