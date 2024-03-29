<script setup lang="ts">
import { computed, type ComputedRef, ref } from 'vue'
import { mdiCloseCircle, mdiMinusCircle } from '@mdi/js'
import type { IFormProp } from 'megio-api/types/collections'

type DateTimeZone = undefined | null | {
    datetime: string
    zone: string
}

const props = defineProps<{
    field: IFormProp
    errors: string[],
    defaultValue?: { value: string, zone_id: string } | null,
    canBeNull: boolean,
    relatedValues: Record<string, any>
}>()

const emits = defineEmits<{
    (e: 'change', field: IFormProp, value?: DateTimeZone | null): void
}>()

const dateTimeInput = ref<string | undefined>(props.defaultValue?.value)
const zoneInput = ref<string | undefined>(props.defaultValue?.zone_id)
const isNull = ref<boolean>(props.defaultValue === null)

const result: ComputedRef<null | undefined | { datetime: string; zone: string }> = computed(() => {
    if (isNull.value) {
        return null
    }

    if (! dateTimeInput.value || ! zoneInput.value) {
        return undefined
    }

    return {
        datetime: dateTimeInput.value,
        zone: zoneInput.value
    }
})

function onDateTimeModelChange(value?: string) {
    dateTimeInput.value = value
    emits('change', props.field, result.value)
}

function onZoneModelChange(value?: string) {
    zoneInput.value = value
    emits('change', props.field, result.value)
}

function toggleNull() {
    isNull.value = ! isNull.value

    dateTimeInput.value = undefined
    zoneInput.value = undefined

    emits('change', props.field, result.value)
}
</script>

<template>
    <div class="d-flex">
        <div class="position-relative w-50">
            <span v-if="result === null" class="text-mono text-grey-lighten-1 position-absolute ps-4 mt-7">null</span>
            <v-text-field
                v-model="dateTimeInput"
                @update:modelValue="onDateTimeModelChange"
                :label="field.label"
                :name="field.name"
                :error="errors.length > 0"
                :disabled="field.disabled"
                :readonly="result === null"
                :active="result !== undefined && result === null"
                hide-details="auto"
            >
                <template v-if="canBeNull" #append-inner>
                    <div>
                        <v-btn icon density="comfortable" variant="text" @click="toggleNull" color="grey">
                            <v-icon :icon="result === null ? mdiMinusCircle : mdiCloseCircle" />
                        </v-btn>
                    </div>
                </template>
            </v-text-field>
        </div>

        <div class="position-relative w-50">
            <span v-if="result === null" class="text-mono text-grey-lighten-1 position-absolute ps-4 mt-7">null</span>
            <v-autocomplete
                v-model="zoneInput"
                @update:modelValue="onZoneModelChange"
                :items="props.field.params.items"
                :label="field.label"
                :name="`${field.name}_zone`"
                :error="errors.length > 0"
                :disabled="field.disabled"
                :readonly="result === null"
                :active="result !== undefined && result === null"
                hide-details="auto"
            >
                <template v-if="canBeNull" #append-inner>
                    <div>
                        <v-btn icon density="comfortable" variant="text" @click="toggleNull" color="grey">
                            <v-icon :icon="result === null ? mdiMinusCircle : mdiCloseCircle" />
                        </v-btn>
                    </div>
                </template>
            </v-autocomplete>
        </div>
    </div>
    <div v-if="errors.length > 0" class="v-input__details text-red-darken-4 px-4">
        {{ errors[0] }}
    </div>
</template>