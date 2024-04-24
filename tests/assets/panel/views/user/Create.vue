<script lang="ts" setup>
import { onMounted } from 'vue'
import { mdiArrowLeft } from '@mdi/js'
import { useComponents, useVuetify, useCreateForm, useRouter } from 'megio-panel'

const router = useRouter()
const { MDatagridForm, MLayout } = useComponents()
const { VBreadcrumbs, VBtn } = useVuetify()
const { loading, formSchema, collectionName, load, save } = useCreateForm('user')

async function handleClickBack() {
    await router.push({ name: 'app.view.users' })
}

onMounted(() => load())
</script>

<template>
    <MLayout :loading="loading" class="bg-grey-lighten-4">
        <template v-slot:default>
            <div class="d-flex justify-space-between align-center pa-7 pb-5">
                <VBreadcrumbs :items="['Přidat', collectionName]" class="pa-0" style="font-size: 1.4rem" />
                <VBtn :icon="mdiArrowLeft" variant="tonal" size="small" @click="handleClickBack" />
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