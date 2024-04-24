<script lang="ts" setup>
import { onMounted } from 'vue'
import { mdiArrowLeft } from '@mdi/js'
import { useComponents, useVuetify, useCreateForm, useRouter, useToast } from 'megio-panel'
import type { IRespCreate } from 'megio-api/types/collections'

const router = useRouter()
const toast = useToast()
const { VBreadcrumbs, VBtn } = useVuetify()
const { MDatagridForm, MLayout } = useComponents()
const { loading, formSchema, collectionName, load, save } = useCreateForm({ recipe: 'user', onSave })

async function onSave(data: IRespCreate['data']) {
    await router.push({ name: 'app.view.users.update', params: { id: data.ids?.[0] } })
    toast.add('Záznam byl úspěšně vytvořen', 'success')
}

async function onClickBack() {
    await router.push({ name: 'app.view.users' })
}

onMounted(() => load())
</script>

<template>
    <MLayout :loading="loading" class="bg-grey-lighten-4">
        <template v-slot:default>
            <div class="d-flex justify-space-between align-center pa-7 pb-5">
                <VBreadcrumbs :items="['Přidat', collectionName]" class="pa-0" style="font-size: 1.4rem" />
                <VBtn :icon="mdiArrowLeft" variant="tonal" size="small" @click="onClickBack" />
            </div>
            <MDatagridForm
                :save-function="save"
                v-if="!loading"
                :form-schema="formSchema"
                :collection-name="collectionName"
            />
        </template>
    </MLayout>
</template>