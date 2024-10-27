<script setup lang="ts">
import { ref } from 'vue'
import { mdiCloseCircle, mdiMinusCircle } from '@mdi/js'
import type { IFormProp } from 'megio-api/types/collections'

export type Props = {
    field: IFormProp
    errors: string[],
    defaultValue?: string | number | null | string[] | number[],
    canBeNull: boolean,
    relatedValues: Record<string, any>
}

export type Emits = {
    (e: 'change', field: IFormProp, value?: string | number | null | string[] | number[]): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const input = ref<undefined | string | number | null | string[] | number[]>(props.defaultValue)

function onInputChange(value?: string | number | null | string[] | number[]) {
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
        <v-select
            @update:modelValue="onInputChange"
            v-model="input"
            :label="field.label"
            :name="field.name"
            :error-messages="errors"
            :items="field?.params.items"
            :item-title="(item: IFormProp) => item.label"
            :item-value="(item: any) => item.value"
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