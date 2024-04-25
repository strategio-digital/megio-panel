<script lang="ts" setup>
import { onMounted } from 'vue'
import { mdiArrowLeft } from '@mdi/js'
import { useComponents, useVuetify, useUpdateForm, useRouter, useRoute } from 'megio-panel'

// Vue router a aktuální routa z `megio-panel`
const router = useRouter()
const route = useRoute()

// Megio a Vuetify komponenty z `megio-panel`
const { MLayout, MDatagridForm } = useComponents()
const { VBreadcrumbs, VBtn } = useVuetify()

// Composable pro úpravu formuláře
const {
    load,
    loading,
    formSchema,
    collectionName,
    save
} = useUpdateForm('user', route.params.id.toString())

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
                    :items="['Upravit', collectionName]"
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
                :saveFunction="save"
                :form-schema="formSchema"
                :collection-name="collectionName"
            />
        </template>
    </MLayout>
</template>