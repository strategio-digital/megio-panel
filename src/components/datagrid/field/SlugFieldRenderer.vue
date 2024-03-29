<script setup lang="ts">
import { computed, ref } from 'vue'
import { mdiCloseCircle, mdiMinusCircle, mdiPencilPlus } from '@mdi/js'
import { makeSlug } from '@/components/helper/makeSlug'
import type { IFormProp } from 'megio-api/types/collections'

const props = defineProps<{
    field: IFormProp
    errors: string[],
    defaultValue?: string | null,
    canBeNull: boolean,
    relatedValues: Record<string, any>
}>()

const emits = defineEmits<{
    (e: 'change', field: IFormProp, value?: string | null): void
}>()

const input = ref<undefined | string | null>(props.defaultValue)
const canGenerate = computed(() => typeof props.relatedValues[props.field.params.slug_from] === 'string')

function onInputChange(value?: string | null) {
    emits('change', props.field, value)
}

function toggleNull() {
    input.value = input.value === null ? undefined : null
    onInputChange(input.value)
}

function generate() {
    const slugFrom = props.field.params.slug_from
    const targetValue = props.relatedValues[slugFrom]

    if (typeof targetValue === 'string') {
        input.value = makeSlug(targetValue)
        onInputChange(input.value)
    }
}
</script>

<template>
    <div class="position-relative">
        <span v-if="input === null" class="text-mono text-grey-lighten-1 position-absolute ps-4 mt-7">null</span>
        <v-text-field
            v-model="input"
            @update:modelValue="onInputChange"
            :label="field.label"
            :name="field.name"
            :error-messages="errors"
            :disabled="field.disabled"
            :readonly="input === null"
            :active="input !== undefined && input === null"
            hide-details="auto"
        >
            <template #append-inner>
                <div>
                    <v-btn
                        icon
                        density="comfortable"
                        variant="text"
                        @click="generate"
                        color="green"
                        :disabled="!canGenerate"
                    >
                        <v-icon :icon="mdiPencilPlus" />
                    </v-btn>
                </div>
                <div v-if="canBeNull">
                    <v-btn icon density="comfortable" variant="text" @click="toggleNull" color="grey">
                        <v-icon :icon="input === null ? mdiMinusCircle : mdiCloseCircle" />
                    </v-btn>
                </div>
            </template>
        </v-text-field>
    </div>
</template>