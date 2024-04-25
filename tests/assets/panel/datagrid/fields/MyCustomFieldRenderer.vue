<script setup lang="ts">
import { ref } from 'vue'
import { useVuetify } from 'megio-panel'
import { mdiCloseCircle, mdiMinusCircle } from '@mdi/js'
import type { IFormProp } from 'megio-api/types/collections'

// Dostupné props
const props = defineProps<{
    field: IFormProp
    errors: string[],
    defaultValue?: string | null,
    canBeNull: boolean,
    relatedValues: Record<string, any>
}>()

// Emit pro aktualizaci hodnoty ve formuláři
const emits = defineEmits<{
    (e: 'change', field: IFormProp, value?: string | null): void
}>()

// Vuetify
const { VBtn, VTextField } = useVuetify()

// Reaktivní field value nastavené na aktuální hodnotu
const input = ref<undefined | string | null>(props.defaultValue)

// Event pro změnu hodnoty v konkrétním fieldu
function onInputChange(value?: string | null) {
    emits('change', props.field, value)
}

// Nullability toggle
function toggleNull() {
    input.value = input.value === null ? undefined : null
    onInputChange(input.value)
}
</script>

<template>
    <div class="position-relative">
        <span
            v-if="input === null"
            class="text-mono text-grey-lighten-1 position-absolute ps-4 mt-7"
        >
            null
        </span>
        <VTextField
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
            <template v-if="canBeNull" #append-inner>
                <div>
                    <VBtn
                        @click="toggleNull"
                        density="comfortable"
                        variant="text"
                        color="grey"
                        icon
                    >
                        <v-icon :icon="input === null ? mdiMinusCircle : mdiCloseCircle" />
                    </VBtn>
                </div>
            </template>
        </VTextField>
    </div>
</template>