<script setup lang="ts">
import { ref } from 'vue'
import { mdiCloseCircle, mdiMinusCircle } from '@mdi/js'
import type { IFormProp } from 'megio-api/types/collections'

export type Props = {
    field: IFormProp
    errors: string[],
    defaultValue?: number | null,
    canBeNull: boolean,
    relatedValues: Record<string, any>
}

export type Emits = {
    (e: 'change', field: IFormProp, value?: number | null): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const input = ref<string | number | null | undefined>(props.defaultValue)

function normalize(value: string): string {
    return value.replace(',', '.')
}

function convert(value: string | number | undefined): number | undefined {
    if (typeof value === 'string') {
        const parsed = parseFloat(normalize(value))
        return isNaN(parsed) ? undefined : parsed
    }

    if (typeof value === 'number') {
        const parsed = parseFloat(normalize(value.toString()))
        return isNaN(parsed) ? undefined : parsed
    }

    return value
}

function onBlur() {
    let value = input.value

    if (typeof value === 'string') {
        value = convert(value)
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