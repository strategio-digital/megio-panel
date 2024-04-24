<script setup lang="ts">
import type { IFormProp } from 'megio-api/types/collections'

const props = defineProps<{
    field: IFormProp
    errors: string[],
    defaultValue?: any | null,
    canBeNull: boolean,
    relatedValues: Record<string, any>
}>()

const emits = defineEmits<{
    (e: 'change', field: IFormProp, value?: any | null): void
}>()

function onInputChange(e: Event) {
    const value = (e.target as HTMLInputElement).value
    emits('change', props.field, value)
}
</script>

<template>
    <input type="hidden" :name="field.name" @change="onInputChange">
</template>