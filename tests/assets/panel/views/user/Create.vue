<script lang="ts" setup>
import { onMounted } from 'vue'
import { mdiArrowLeft } from '@mdi/js'
import { useComponents, useVuetify, useCreateForm, useRouter, useToast } from 'megio-panel'
import type { IRespCreate } from 'megio-api/types/collections'

// Vue router a toaster z `megio-panel`
const router = useRouter()
const toast = useToast()

// Megio a Vuetify komponenty z `megio-panel`
const { VBreadcrumbs, VBtn } = useVuetify()
const { MDatagridForm, MLayout } = useComponents()

// Composable pro vytvoření formuláře
const {
    loading,
    formSchema,
    collectionName,
    load,
    save
} = useCreateForm({ recipe: 'user', onSave })

// Callback volaný po uložení dat
async function onSave(data: IRespCreate['data']) {
    await router.push({
        name: 'app.view.users.update',
        params: {
            id: data.ids?.[0]
        }
    })
    toast.add('Záznam byl úspěšně vytvořen', 'success')
}

// Event pro kliknutí na tlačítko zpět
async function onClickBack() {
    await router.push({ name: 'app.view.users' })
}

// Načtení dat při načtení komponenty
onMounted(() => load())
</script>

<template>
    <MLayout :loading="loading" class="bg-grey-lighten-4">
        <template v-slot:default>
            <div class="d-flex justify-space-between align-center pa-7 pb-5">
                <VBreadcrumbs
                    :items="['Přidat', collectionName]"
                    class="pa-0"
                    style="font-size: 1.4rem"
                />
                <VBtn
                    @click="onClickBack"
                    :icon="mdiArrowLeft"
                    variant="tonal"
                    size="small"
                />
            </div>
            <MDatagridForm
                v-if="!loading"
                :save-function="save"
                :form-schema="formSchema"
                :collection-name="collectionName"
            />
        </template>
    </MLayout>
</template>