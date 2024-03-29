<script setup lang="ts">
import { ref } from 'vue'
import { mdiCloseCircle, mdiMinusCircle, mdiEye } from '@mdi/js'
import type { IFormProp } from 'megio-api/types/collections'

const props = defineProps<{
    field: IFormProp
    errors: string[],
    defaultValue?: string | null
    canBeNull: boolean,
    relatedValues: Record<string, any>
}>()

const emits = defineEmits<{
    (e: 'change', field: IFormProp, value?: string | null): void
}>()

const input = ref<undefined | string | null>(props.defaultValue)
const showPassword = ref<boolean>(false)

function onInputChange(value?: string | null) {
    emits('change', props.field, value)
}

function toggleNull() {
    input.value = input.value === null ? undefined : null
    onInputChange(input.value)
}

function togglePassword() {
    showPassword.value = ! showPassword.value
}

</script>

<template>
    <div class="position-relative">
        <span v-if="input === null" class="text-mono text-grey-lighten-1 position-absolute ps-4 mt-7">null</span>
        <v-text-field
            v-model="input"
            @update:modelValue="onInputChange"
            autocomplete="new-password"
            :type="showPassword ? 'text' : 'password'"
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
                        @click="togglePassword"
                        :color="showPassword ? 'red': 'grey'"
                    >
                        <v-icon :icon="mdiEye" />
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