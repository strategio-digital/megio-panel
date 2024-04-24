<script setup lang="ts">
import type IColumnProps from '@/components/datagrid/types/IColumnProps'

defineProps<IColumnProps>()
</script>

<template>
    <strong class="text-red">@unknown: {{ columnSchema.renderer }}</strong>
</template>