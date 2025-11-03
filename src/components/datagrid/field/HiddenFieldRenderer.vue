<script setup lang="ts">
import type { FormProp } from 'megio-api/types/collections'

export type Props = {
    field: FormProp
    errors: string[],
    defaultValue?: any | null,
    canBeNull: boolean,
    relatedValues: Record<string, any>
}

export type Emits = {
    (e: 'change', field: FormProp, value?: any | null): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

function onInputChange(e: Event) {
    const value = (e.target as HTMLInputElement).value
    emits('change', props.field, value)
}
</script>

<template>
    <input type="hidden" :name="field.name" @change="onInputChange">
</template>