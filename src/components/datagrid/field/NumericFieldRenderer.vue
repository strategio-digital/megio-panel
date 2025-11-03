<script setup lang="ts">
import { ref } from 'vue'
import { mdiCloseCircle, mdiMinusCircle } from '@mdi/js'
import type { FormProp } from 'megio-api/types/collections'

export type Props = {
    field: FormProp
    errors: string[],
    defaultValue?: number | null
    canBeNull: boolean,
    relatedValues: Record<string, any>
}

export type Emits = {
    (e: 'change', field: FormProp, value?: number | null): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const input = ref<undefined | number | string | null>(props.defaultValue)

function normalize(value: string): string {
    return value.replace(',', '.')
}

function convert(value?: string | number): number | undefined {
    if (typeof value === 'number') {
        return isNaN(value) ? undefined : value
    }

    if (value === '') {
        return undefined
    }

    if (typeof value === 'string') {
        const normalized = normalize(value)
        const numeric = +normalized
        return isNaN(numeric) ? undefined : numeric
    }

    return value
}

function onBlur() {
    let value = input.value

    if (typeof value === 'string' || typeof value === 'number') {
        value = convert(value)
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