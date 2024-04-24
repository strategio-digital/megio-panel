<script setup lang="ts">
import { ref } from 'vue'
import { mdiMinus } from '@mdi/js'
import type IColumnProps from '@/components/datagrid/types/IColumnProps'

const props = defineProps<IColumnProps>()

const value = ref<{
    is_positive: boolean,
    all_days: number,
    each: {
        years: number
        months: number
        days: number
        hours: number
        minutes: number
        seconds: number
    }
}>(props.value)
</script>

<template>
    <span v-if="value" :title="`Interval: ${value.is_positive ? 'Kladný' : 'Záporný'} | Celkem dní: ${value.all_days}`">
        {{ value.each.years }}y
        {{ value.each.months }}m
        {{ value.each.days }}d
        {{ value.each.hours }}h
        {{ value.each.minutes }}m
        {{ value.each.seconds }}s
    </span>
    <v-icon v-else :icon="mdiMinus" color="grey" size="sm" />
</template>