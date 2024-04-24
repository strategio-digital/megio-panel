<script lang="ts" setup>
import { onMounted } from 'vue'
import { mdiArrowLeft } from '@mdi/js'

import { useComponents, useVuetify, useUpdateForm, useRouter, useRoute } from 'megio-panel'

const router = useRouter()
const route = useRoute()
const { MLayout, MDatagridForm } = useComponents()
const { VBreadcrumbs, VBtn } = useVuetify()
const { load, loading, formSchema, collectionName, save } = useUpdateForm('user', route.params.id.toString())

async function onClickBack() {
    await router.push({ name: 'app.view.users' })
}

onMounted(() => load())
</script>

<template>
    <MLayout :loading="loading" class="bg-grey-lighten-4">
        <template v-slot:default>
            <div class="d-flex justify-space-between align-center pa-7 pb-5">
                <VBreadcrumbs :items="['Upravit', collectionName]" class="pa-0" style="font-size: 1.4rem" />
                <VBtn :icon="mdiArrowLeft" variant="tonal" size="small" @click="onClickBack" />
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