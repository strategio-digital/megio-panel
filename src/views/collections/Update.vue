<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { mdiArrowLeft } from '@mdi/js'
import { megio } from 'megio-api'
import { useToast } from '@/components/toast/useToast'
import Layout from '@/components/layout/Layout.vue'
import DatagridForm from '@/components/datagrid/form/DatagridForm.vue'
import type { IFormProp, IRespUpdate } from 'megio-api/types/collections'

const router = useRouter()
const route = useRoute()
const toast = useToast()

const loading = ref(true)
const collectionName = ref<string>(route.params.name.toString())
const formSchema = ref<IFormProp[]>([])

async function save(data: Record<string, any>): Promise<IRespUpdate> {
    const resp = await megio.collections.update({
        recipe: collectionName.value,
        rows: [{
            id: route.params.id.toString(),
            data
        }]
    })

    if (resp.success) {
        toast.add('Záznam byl úspěšně upraven', 'success')
    }

    return resp
}

async function load(): Promise<void> {
    const resp = await megio.collectionsExtra.updatingForm({
        recipe: collectionName.value,
        id: route.params.id.toString()
    })

    if (resp.success) {
        formSchema.value = resp.data.form
    }

    loading.value = false
}

async function handleClickBack() {
    await router.push({ name: 'megio.view.collections', params: { name: collectionName.value } })
}

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