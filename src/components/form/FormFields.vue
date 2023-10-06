<script lang="ts" setup>
import { type UnwrapRef } from 'vue'
import type IFormField from '@/composables/form/IFormField'

defineProps<{ fields: UnwrapRef<IFormField[]> }>()
</script>

<template>
    <v-row dense>
        <v-col cols="12" v-for="(field, i) in fields" :key="i">
            <v-text-field
                v-if="field.type === 'text' || field.type === 'datetime'"
                :disabled="field.disabled"
                :label="field.label"
                v-model="field.value"
            />

            <v-select
                v-if="field.type === 'select'"
                :label="field.label"
                :disabled="field.disabled"
                v-model="field.value"
                :items="field.items"
                item-title="label"
                item-value="id"
                return-object
            />
        </v-col>
    </v-row>
</template>