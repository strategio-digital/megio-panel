<script setup lang="ts">
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import { onMounted, ref } from 'vue'
import { mdiCloseCircle, mdiMinusCircle } from '@mdi/js'
import Quill, { type QuillOptions } from 'quill'
import type { IFormProp } from 'megio-api/types/collections'

const props = defineProps<{
    field: IFormProp
    errors: string[],
    defaultValue?: string | null,
    canBeNull: boolean,
    relatedValues: Record<string, any>
}>()

const emits = defineEmits<{ (e: 'change', field: IFormProp, value?: string | null): void }>()
let quill: Quill

const settings: QuillOptions = {
    theme: 'snow',
    readOnly: props.field.disabled,
    modules: {
        toolbar: [
            [{ 'header': [2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike', { 'color': [] }],

            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            ['link'],

            ['blockquote', 'code-block', 'clean']
        ]
    }
}

const input = ref<undefined | string | null>(props.defaultValue)
const hidden = ref<boolean>(false)
const active = ref<boolean>(false)

function onChange(value?: string | null) {
    const regex = /<p><br><\/p>|<h[1-6]><br><\/h[1-6]>/g

    if (value && value.match(regex)) {
        input.value = undefined
    } else {
        input.value = value
    }

    active.value = input.value !== undefined

    emits('change', props.field, input.value)
}

function toggleNull() {
    const setNull = input.value !== null

    if (setNull) {
        hidden.value = true
        quill.setText('')
        quill.disable()
    } else {
        hidden.value = false
        quill.enable()
        quill.focus()
    }

    input.value = setNull ? null : undefined
    onChange(input.value)
}

onMounted(() => {
    const el = document.querySelector(`#rich-text-${props.field.name} .editor`) as HTMLDivElement

    quill = new Quill(el, settings)
    quill.setText(input.value || '')
    quill.on(Quill.events.TEXT_CHANGE, () => onChange(quill.root.innerHTML || ''), Quill.sources.SILENT)

    if (input.value === null) {
        active.value = true
        hidden.value = true
        quill.disable()
    }
})

</script>

<template>
    <div class="position-relative" :id="`rich-text-${props.field.name}`">
        <div class="virtual-field rounded-t" :class="{ error: errors.length > 0, active}">
            <div v-if="canBeNull" class="position-absolute d-flex w-100 justify-end pa-3">
                <v-btn icon density="comfortable" variant="text" @click="toggleNull" color="grey" style="z-index: 10">
                    <v-icon :icon="input === null ? mdiMinusCircle : mdiCloseCircle" />
                </v-btn>
            </div>
            <div class="px-4 pt-2">
                <div class="virtual-field-label" :class="{ error: errors.length > 0, active}">{{ field.label }}</div>
                <div class="position-absolute" v-if="input === null">
                    <div class="text-mono text-grey-lighten-1">null</div>
                </div>
            </div>
            <div class="quill-text-editor position-relative" :class="{'d-none': hidden}">
                <div class="editor border-0"></div>
            </div>
        </div>

        <div v-if="errors.length > 0" class="v-input__details text-red-darken-4 px-4">
            {{ errors[0] }}
        </div>
    </div>
</template>