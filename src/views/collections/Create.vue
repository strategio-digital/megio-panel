<script lang="ts" setup>
import { computed, inject, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { megio } from 'megio-api'
import { mdiArrowLeft, mdiContentSave } from '@mdi/js'
import { useToast } from '@/components/toast/useToast'
import Layout from '@/components/layout/Layout.vue'
import TextFieldRenderer from '@/components/datagrid/field/TextFieldRenderer.vue'
import type IDatagridSettings from '@/components/datagrid/types/IDatagridSettings'
import type { IFormProp, IRespCreate } from 'megio-api/types/collections'
import type { Component as VueComponent } from 'vue'
import HiddenFieldRenderer from '@/components/datagrid/field/HiddenFieldRenderer.vue'

const route = useRoute()
const router = useRouter()
const toast = useToast()

const fieldRenderers: IDatagridSettings['fields'] | undefined = inject('datagrid-fields')

const loading = ref(true)
const saving = ref(false)
const collectionName = ref<string>(route.params.name.toString())
const formSchema = ref<IFormProp[]>([])
const data = ref<Record<string, any>>([])
const areDataEmpty = computed(() => Object.values(data.value).filter(e => e !== undefined).length === 0)
const errors = ref<IRespCreate['data']['validation_errors']>({ '@': [] })

async function load(): Promise<void> {
    const resp = await megio.collectionsExtra.creatingForm({
        recipe: collectionName.value
    })

    if (resp.success) {
        formSchema.value = resp.data.form
        data.value = createData()
    }

    loading.value = false
}

async function onSubmit() {
    saving.value = true

    const resp = await megio.collections.create({
        recipe: collectionName.value,
        rows: [{ ...data.value }]
    })

    if (resp.success) {
        // TODO: move to collection view
        toast.add('Záznam byl úspěšně vytvořen', 'success')
        await router.push({ name: 'megio.view.collections', params: { name: collectionName.value } })
    } else {
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
    console.log(value)
    data.value[field.name] = value === '' ? undefined : value
}

async function handleClickBack() {
    await router.push({ name: 'megio.view.collections', params: { name: collectionName.value } })
}

function createData() {
    const obj: Record<string, any> = {}
    formSchema.value.forEach((field) => {
        obj[field.name] = field?.default_value
    })
    return obj
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

onMounted(() => load())
</script>

<template>
    <Layout :loading="loading" class="bg-grey-lighten-4">
        <template v-slot:default>
            <div class="d-flex justify-space-between align-center pa-7 pb-5">
                <v-breadcrumbs :items="['Přidat', collectionName]" class="pa-0" style="font-size: 1.4rem" />
                <v-btn :icon="mdiArrowLeft" variant="tonal" size="small" @click="handleClickBack" />
            </div>

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
                        <template
                            v-for="field in formSchema"
                            :key="field.name"
                        >
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
    </Layout>
</template>