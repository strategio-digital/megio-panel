<script setup lang="ts">
import { useToast } from '@/components/toast/useToast'
import { computed, inject, onMounted, ref } from 'vue'
import { mdiContentSave } from '@mdi/js'
import HiddenFieldRenderer from '@/components/datagrid/field/HiddenFieldRenderer.vue'
import TextFieldRenderer from '@/components/datagrid/field/TextFieldRenderer.vue'
import type IDatagridSettings from '@/components/datagrid/types/IDatagridSettings'
import type { Component as VueComponent } from 'vue'
import type { FormProp, RespCreate, RespUpdate } from 'megio-api/types/collections'

export type Props = {
    recipeKey: string
    formSchema: FormProp[],
    saveFunction: (data: Record<string, any>) => Promise<RespCreate | RespUpdate>
}

const props = defineProps<Props>()

const toast = useToast()
const fieldRenderers = inject<IDatagridSettings['fields']>('datagrid-fields')

const saving = ref(false)
const data = ref<Record<string, any>>([])
const errors = ref<{ [key: string]: string[], '@': string[] }>({ '@': [] })

const areDataEmpty = computed(() => Object.values(data.value).filter(e => e !== undefined).length === 0)

function createData() {
    const obj: Record<string, any> = {}
    props.formSchema.forEach((field) => {
        obj[field.name] = field.value !== undefined ? field.value : field.default_value
    })
    return obj
}

async function onSubmit() {
    saving.value = true
    const resp = await props.saveFunction({ ...data.value })

    if (!resp.success) {
        onErrorResponse(resp)
    }

    saving.value = false
}

function onErrorResponse(resp: RespCreate | RespUpdate) {
    if (!resp.success) {
        const errorData = resp.data

        errors.value = Object.assign({}, errorData.validation_errors, {
            '@': [...(errorData.validation_errors?.['@'] || [])]
        })

        if (errors.value['@'].length) {
            errors.value['@'].forEach((e: string) => toast.add(e, 'error'))
        }

        // focus on first non @ field
        const firstField = Object.keys({ ...errors.value }).find(key => key !== '@')

        if (firstField) {
            const el = document.querySelector(`[name="${firstField}"]`)
            if (el instanceof HTMLElement) {
                el.scrollIntoView({ behavior: 'smooth' })
                el.focus()
                if (el instanceof HTMLInputElement && el.type === 'hidden') {
                    toast.add(`Field '${firstField}' | ${errors.value[firstField]?.[0] || 'Error'}`, 'error')
                }
            }
        }
    }
}

function handleFieldChange(field: FormProp, value: any) {
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

function canBeNull(field: FormProp): boolean {
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
                            :default-value="field?.value !== undefined ? field.value : field?.default_value"
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