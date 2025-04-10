<script lang="ts" setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { mdiArrowLeft } from '@mdi/js'
import { useToast } from '@/components/toast/useToast'
import { useCreateForm } from '@/components/datagrid/form/useCreateForm'
import DatagridForm from '@/components/datagrid/form/DatagridForm.vue'
import Layout from '@/components/layout/Layout.vue'
import type { IRespCreate } from 'megio-api/types/collections'

const router = useRouter()
const toast = useToast()

const {
    loading,
    formSchema,
    recipe,
    load,
    save
} = useCreateForm({
    recipeKey: 'admin',
    onSave
})

async function onSave(data: IRespCreate['data']) {
    await router.push({ name: 'megio.view.settings.admins.update', params: { id: data.ids?.[0] } })
    toast.add('Záznam byl úspěšně vytvořen', 'success')
}

async function onClickBack() {
    await router.push({ name: 'megio.view.settings.admins' })
}

onMounted(() => load())
</script>

<template>
    <Layout :loading="loading" class="bg-grey-lighten-4">
        <template v-slot:default>
            <div class="d-flex justify-space-between align-center pa-7 pb-5">
                <v-breadcrumbs :items="['Přidat', recipe.name]" class="pa-0" style="font-size: 1.4rem" />
                <v-btn :icon="mdiArrowLeft" variant="tonal" size="small" @click="onClickBack" />
            </div>
            <DatagridForm
                :save-function="save"
                v-if="!loading"
                :form-schema="formSchema"
                :recipe-key="recipe.key"
            />
        </template>
    </Layout>
</template>