<script lang="ts" setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { mdiArrowLeft } from '@mdi/js'
import { useUpdateForm } from '@/components/datagrid/form/useUpdateForm'
import Layout from '@/components/layout/Layout.vue'
import DatagridForm from '@/components/datagrid/form/DatagridForm.vue'

const route = useRoute()
const router = useRouter()

const {
    load,
    loading,
    formSchema,
    recipe,
    save,
} = useUpdateForm('admin', route.params.id.toString())

async function onClickBack() {
    await router.push({ name: 'megio.view.settings.admins' })
}

onMounted(() => load())
</script>

<template>
    <Layout :loading="loading" class="bg-grey-lighten-4">
        <template v-slot:default>
            <div class="d-flex justify-space-between align-center pa-7 pb-5">
                <v-breadcrumbs :items="['Upravit', recipe.name]" class="pa-0" style="font-size: 1.4rem" />
                <v-btn :icon="mdiArrowLeft" variant="tonal" size="small" @click="onClickBack" />
            </div>
            <DatagridForm
                v-if="!loading"
                :saveFunction="save"
                :form-schema="formSchema"
                :recipe-key="recipe.key"
            />
        </template>
    </Layout>
</template>