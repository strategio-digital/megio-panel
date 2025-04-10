<script lang="ts" setup>
import { mdiArrowLeft } from '@mdi/js'
import Layout from '@/components/layout/Layout.vue'
import DatagridForm from '@/components/datagrid/form/DatagridForm.vue'
import { useCreateForm } from '@/components/datagrid/form/useCreateForm'
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'

const route = useRoute()

const {
    loading,
    formSchema,
    recipe,
    load,
    save,
    handleClickBack
} = useCreateForm({
    recipeKey: route.params.name.toString()
})

onMounted(() => load())
</script>

<template>
    <Layout :loading="loading" class="bg-grey-lighten-4">
        <template v-slot:default>
            <div class="d-flex justify-space-between align-center pa-7 pb-5">
                <v-breadcrumbs :items="['Přidat', recipe.name]" class="pa-0" style="font-size: 1.4rem" />
                <v-btn :icon="mdiArrowLeft" variant="tonal" size="small" @click="handleClickBack" />
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