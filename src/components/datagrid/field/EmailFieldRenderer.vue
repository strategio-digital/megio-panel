<script setup lang="ts">
import { ref } from 'vue'
import { mdiCloseCircle, mdiMinusCircle } from '@mdi/js'
import type { IFormProp } from 'megio-api/types/collections'

export type Props = {
    field: IFormProp
    errors: string[],
    defaultValue?: string | null,
    canBeNull: boolean,
    relatedValues: Record<string, any>
}

export type Emits = {
    (e: 'change', field: IFormProp, value?: string | null): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const input = ref<undefined | string | null>(props.defaultValue)

function onInputChange(value?: string | null) {
    emits('change', props.field, value)
}

function toggleNull() {
    input.value = input.value === null ? undefined : null
    onInputChange(input.value)
}
</script>

<template>
    <div class="position-relative">
        <span v-if="input === null" class="text-mono text-grey-lighten-1 position-absolute ps-4 mt-7">null</span>
        <v-text-field
            v-model="input"
            @update:modelValue="onInputChange"
            autocomplete="off"
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