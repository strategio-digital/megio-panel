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

defineProps<Props>()
defineEmits<Emits>()
</script>

<template>
    <div class="text-white bg-red pa-4 rounded">@unknown: {{ field.renderer }}</div>
</template>