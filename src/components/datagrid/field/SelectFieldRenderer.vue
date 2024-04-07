<script setup lang="ts">
import { ref } from 'vue'
import { mdiCloseCircle, mdiMinusCircle } from '@mdi/js'
import type { IFormProp } from 'megio-api/types/collections'

const props = defineProps<{
    field: IFormProp
    errors: string[],
    defaultValue?: string | number | null | string[] | number[],
    canBeNull: boolean,
    relatedValues: Record<string, any>
}>()

const emits = defineEmits<{
    (e: 'change', field: IFormProp, value?: string | number | null): void
}>()

const input = ref<undefined | string | number | null | string[] | number[]>(props.defaultValue)

function onInputChange(value?: string | number | null | string[] | number[]) {
    if (value === undefined || value === null || typeof value === 'string' || typeof value === 'number') {
        emits('change', props.field, value)
    }
}

function toggleNull() {
    input.value = input.value === null ? undefined : null
    onInputChange(input.value)
}
</script>

<template>
    <div class="position-relative">
        <span v-if="input === null" class="text-mono text-grey-lighten-1 position-absolute ps-4 mt-7">null</span>
        <v-select
            @update:modelValue="onInputChange"
            v-model="input"
            :label="field.label"
            :name="field.name"
            :error-messages="errors"
            :items="field?.params.items as Array<{ label: string, value: string | number }>"
            :item-title="e => e.label"
            :item-value="e => e.value"
            :multiple="field.params.multiple"
            :disabled="field.disabled"
            :readonly="input === null"
            :active="input !== undefined && input === null"
            hide-details="auto"
        >
            <template v-if="canBeNull" #append-inner>
                <div>
                    <v-btn icon density="comfortable" variant="text" @click="toggleNull" color="grey">
                        <v-icon :icon="input === null ? mdiMinusCircle : mdiCloseCircle" />
                    </v-btn>
                </div>
            </template>
        </v-select>
    </div>
</template>