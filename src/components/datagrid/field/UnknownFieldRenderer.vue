<script setup lang="ts">
import type { IFormProp } from 'megio-api/types/collections'

export type Props = {
    field: IFormProp
    errors: string[],
    defaultValue?: any | null,
    canBeNull: boolean,
    relatedValues: Record<string, any>
}

export type Emits = {
    (e: 'change', field: IFormProp, value?: any | null): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>

<template>
    <div class="text-white bg-red pa-4 rounded">@unknown: {{ field.renderer }}</div>
</template>