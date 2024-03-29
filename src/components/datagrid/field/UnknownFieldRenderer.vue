<script setup lang="ts">
import type { IFormProp } from 'megio-api/types/collections'

defineProps<{
    field: IFormProp
    errors: string[],
    defaultValue?: any | null,
    canBeNull: boolean,
    relatedValues: Record<string, any>
}>()

defineEmits<{
    (e: 'change', field: IFormProp, value?: any | null): void
}>()
</script>

<template>
    <div class="text-white bg-red pa-4 rounded">@unknown: {{ field.renderer }}</div>
</template>