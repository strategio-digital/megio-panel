<script lang="ts" setup>
import { onMounted } from 'vue'
import { mdiArrowLeft } from '@mdi/js'
import Layout from '@/components/layout/Layout.vue'
import DatagridForm from '@/components/datagrid/form/DatagridForm.vue'
import { useRouter } from 'vue-router'
import { useCreateForm } from '@/components/datagrid/form/useCreateForm'

const router = useRouter();

const {
    loading,
    formSchema,
    collectionName,
    load,
    save
} = useCreateForm('admin')

async function handleClickBack() {
    await router.push({ name: 'megio.view.settings.admins' })
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
            <DatagridForm
                :save-function="save"
                v-if="!loading"
                :form-schema="formSchema"
                :collection-name="collectionName"
            />
        </template>
    </Layout>
</template>