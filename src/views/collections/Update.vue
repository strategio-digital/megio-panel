<script lang="ts" setup>
import { onMounted } from 'vue'
import { mdiArrowLeft } from '@mdi/js'
import Layout from '@/components/layout/Layout.vue'
import DatagridForm from '@/components/datagrid/form/DatagridForm.vue'
import { useUpdateForm } from '@/components/datagrid/form/useUpdateForm'
import { useRoute } from 'vue-router'

const route = useRoute();

const {
    load,
    loading,
    formSchema,
    collectionName,
    save,
    handleClickBack
} = useUpdateForm(route.params.name.toString(), route.params.id.toString())


onMounted(() => load())
</script>

<template>
    <Layout :loading="loading" class="bg-grey-lighten-4">
        <template v-slot:default>
            <div class="d-flex justify-space-between align-center pa-7 pb-5">
                <v-breadcrumbs :items="['Upravit', collectionName]" class="pa-0" style="font-size: 1.4rem" />
                <v-btn :icon="mdiArrowLeft" variant="tonal" size="small" @click="handleClickBack" />
            </div>
            <DatagridForm
                v-if="!loading"
                :saveFunction="save"
                :form-schema="formSchema"
                :collection-name="collectionName"
            />
        </template>
    </Layout>
</template>