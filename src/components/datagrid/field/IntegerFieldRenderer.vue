<script setup lang="ts">
import { ref } from 'vue'
import { mdiCloseCircle, mdiMinusCircle } from '@mdi/js'
import type { IFormProp } from 'megio-api/types/collections'

const props = defineProps<{
    field: IFormProp
    errors: string[],
    defaultValue?: number | null,
    canBeNull: boolean,
    relatedValues: Record<string, any>
}>()

const emits = defineEmits<{
    (e: 'change', field: IFormProp, value?: number | null): void
}>()

const input = ref<string | number | null | undefined>(props.defaultValue)

function onBlur() {
    let value = input.value

    if (typeof value === 'string') {
        const v = parseInt(value)
        value = isNaN(v) ? undefined : v
    } else if (typeof value === 'number') {
        value = isNaN(value) ? undefined : value
    }

    input.value = value
    emits('change', props.field, input.value)
}

function toggleNull() {
    input.value = input.value === null ? undefined : null
    onBlur()
}
</script>

<template>
    <div class="position-relative">
        <span v-if="input === null" class="text-mono text-grey-lighten-1 position-absolute ps-4 mt-7">null</span>
        <v-text-field
            @blur="onBlur"
            v-model="input"
            :label="field.label"
            :name="field.name"
            :error-messages="errors"
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
        </v-text-field>
    </div>
</template>