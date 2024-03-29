<script setup lang="ts">
import { ref } from 'vue'
import { mdiCloseCircle, mdiMinusCircle } from '@mdi/js'
import type { IFormProp } from 'megio-api/types/collections'

const props = defineProps<{
    field: IFormProp
    errors: string[],
    defaultValue?: string | null,
    canBeNull: boolean,
    relatedValues: Record<string, any>
}>()

const emits = defineEmits<{
    (e: 'change', field: IFormProp, value?: any | null): void
}>()

const input = ref<undefined | string | null>(props.defaultValue)

function onInputChange(value?: string | null) {
    if (value !== null && typeof value === 'string') {
        try {
            value = JSON.parse(value)
        } catch (e) {
        }
    }

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
        <v-textarea
            @update:modelValue="onInputChange"
            v-model="input"
            :label="field.label"
            :name="field.name"
            :error-messages="errors"
            :disabled="field.disabled"
            :readonly="input === null"
            :active="input !== undefined && input === null"
            :rows="input === null ? 1 : 5"
            hide-details="auto"
        >
            <template v-if="canBeNull" #append-inner>
                <div>
                    <v-btn icon density="comfortable" variant="text" @click="toggleNull" color="grey">
                        <v-icon :icon="input === null ? mdiMinusCircle : mdiCloseCircle" />
                    </v-btn>
                </div>
            </template>
        </v-textarea>
    </div>
</template>