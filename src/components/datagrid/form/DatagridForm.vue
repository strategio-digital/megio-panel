<script setup lang="ts">
import { useToast } from '@/components/toast/useToast'
import { computed, inject, onMounted, ref } from 'vue'
import { mdiContentSave } from '@mdi/js'
import HiddenFieldRenderer from '@/components/datagrid/field/HiddenFieldRenderer.vue'
import TextFieldRenderer from '@/components/datagrid/field/TextFieldRenderer.vue'
import type IDatagridSettings from '@/components/datagrid/types/IDatagridSettings'
import type { Component as VueComponent } from '@vue/runtime-core'
import type { IFormProp, IRespCreate, IRespUpdate } from 'megio-api/types/collections'

const props = defineProps<{
    collectionName: string
    formSchema: IFormProp[],
    saveFunction: (data: Record<string, any>) => Promise<IRespCreate | IRespUpdate>
}>()

const toast = useToast()
const fieldRenderers: IDatagridSettings['fields'] | undefined = inject('datagrid-fields')

const saving = ref(false)
const data = ref<Record<string, any>>([])
const errors = ref<IRespCreate['data']['validation_errors']>({ '@': [] })

const areDataEmpty = computed(() => Object.values(data.value).filter(e => e !== undefined).length === 0)

function createData() {
    const obj: Record<string, any> = {}
    props.formSchema.forEach((field) => {
        obj[field.name] = field?.value || field?.default_value
    })
    return obj
}

async function onSubmit() {
    saving.value = true
    const resp = await props.saveFunction({ ...data.value })

    if (! resp.success) {
        onErrorResponse(resp)
    }

    saving.value = false
}

function onErrorResponse(resp: IRespCreate) {
    errors.value = resp.data?.validation_errors || { '@': [] }
    if (errors.value?.['@']?.length) {
        errors.value?.['@']?.forEach((e) => toast.add(e, 'error'))
    }
    // focus on first non @ field
    const firstField = Object.keys({ ...errors.value }).find(key => key !== '@')
    if (firstField) {
        const el = document.querySelector(`[name="${firstField}"]`)
        if (el instanceof HTMLElement) {
            el.scrollIntoView({ behavior: 'smooth' })
            el.focus()
            if (el instanceof HTMLInputElement && el.type === 'hidden') {
                toast.add(`Field '${firstField}' | ${errors.value?.[firstField][0]}`, 'error')
            }
        }
    }
}

function handleFieldChange(field: IFormProp, value: any) {
    removeErrors(field.name)
    data.value[field.name] = value === '' ? undefined : value
}

function removeErrors(field: string) {
    errors.value = {
        ...errors.value,
        '@': errors.value?.['@'] || [],
        [field]: []
    }
}

function canBeNull(field: IFormProp): boolean {
    return field.rules.filter(r => r.name === 'NullableRule').length > 0
}

function getErrorMessages(field: string): string[] {
    return errors.value?.[field] || []
}

function getFieldRenderer(rendererName: string): VueComponent {
    const column = fieldRenderers?.find(f => f.rendererName === rendererName)

    if (column) {
        return column.component
    }

    return TextFieldRenderer
}

onMounted(() => {
    data.value = createData()
})
</script>

<template>
    <v-form
        validate-on="blur"
        ref="form"
        @submit.prevent="onSubmit"
        :autofocus="false"
        autocomplete="off"
        class="px-7"
    >
        <div class="bg-white rounded-lg pa-10 mb-7" style="max-width: 1500px; margin: 0 auto">
            <div class="collection-grid">
                <template v-for="field in formSchema" :key="field.name">
                    <div
                        v-if="field.renderer !== 'hidden-field-renderer'"
                        :class="field.attrs?.fullWidth === true ? 'grid-span-2' : 'grid-span-1'"
                    >
                        <component
                            :is="getFieldRenderer(field.renderer)"
                            :field="field"
                            :relatedValues="data"
                            :default-value="field?.value || field?.default_value"
                            :can-be-null="canBeNull(field)"
                            :errors="getErrorMessages(field.name)"
                            @change="handleFieldChange"
                        />
                    </div>
                    <HiddenFieldRenderer
                        v-if="field.renderer === 'hidden-field-renderer'"
                        :field="field"
                        :relatedValues="data"
                        :default-value="field?.value"
                        :can-be-null="canBeNull(field)"
                        :errors="getErrorMessages(field.name)"
                    />
                </template>
            </div>

            <div class="mt-5 text-end">
                <v-btn
                    class="ma-0"
                    type="submit"
                    variant="flat"
                    color="green"
                    :prepend-icon="mdiContentSave"
                    :loading="saving"
                    :disabled="saving || areDataEmpty"
                >
                    Uložit záznam
                </v-btn>
            </div>
        </div>
    </v-form>
</template>