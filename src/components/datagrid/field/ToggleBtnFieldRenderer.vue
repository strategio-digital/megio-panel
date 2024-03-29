<script setup lang="ts">
import { ref } from 'vue'
import { mdiCloseCircle, mdiMinusCircle } from '@mdi/js'
import type { IFormProp } from 'megio-api/types/collections'

const props = defineProps<{
    field: IFormProp
    errors: string[],
    defaultValue?: boolean | null,
    canBeNull: boolean,
    relatedValues: Record<string, any>
}>()

const emits = defineEmits<{
    (e: 'change', field: IFormProp, value?: boolean | null): void
}>()

const input = ref<undefined | boolean | null>(props.defaultValue)

function onInputChange() {
    emits('change', props.field, input.value)
}

function toggleNull() {
    input.value = input.value === null ? false : null
    onInputChange()
}
</script>

<template>
    <div
        class="d-flex justify-space-between align-center ps-4 pe-3 rounded-t virtual-field"
        :class="{ error: errors.length > 0}"
    >
        <div v-if="input === null">
            <div style="font-size: 12px; color: #727272">{{ field.label }}</div>
            <div class="text-mono text-grey-lighten-1">null</div>
        </div>

        <v-switch
            v-else
            v-model="input"
            @update:modelValue="onInputChange"
            :label="field.label"
            :name="field.name"
            :disabled="field.disabled"
            class="ma-0 pa-0"
            hide-details="auto"
            density="compact"
            color="primary"
        />

        <div v-if="canBeNull">
            <v-btn icon density="comfortable" variant="text" @click="toggleNull" color="grey">
                <v-icon :icon="input === null ? mdiMinusCircle : mdiCloseCircle" />
            </v-btn>
        </div>
    </div>

    <div v-if="errors.length > 0" class="v-input__details text-red-darken-4 px-4">
        {{ errors[0] }}
    </div>
</template>