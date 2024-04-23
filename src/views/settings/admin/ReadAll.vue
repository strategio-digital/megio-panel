<script lang="ts" setup>
import { ref, inject } from 'vue'
import { megio } from 'megio-api'
import { useRouter } from 'vue-router'
import Layout from '@/components/layout/Layout.vue'
import SettingNav from '@/components/navbar/SettingNav.vue'
import PageHeading from '@/components/layout/PageHeading.vue'
import Datagrid from '@/components/datagrid/Datagrid.vue'
import type IDatagridSettings from '@/components/datagrid/types/IDatagridSettings'
import type { IRespReadAll, IPagination, IRow } from 'megio-api/types/collections'

const router = useRouter()

const recipeName = 'admin'
const actions: IDatagridSettings['actions'] | undefined = inject('datagrid-actions')
const loading = ref<boolean>(true)
const datagrid = ref()

async function loadFunction(newPagination: IPagination): Promise<IRespReadAll> {
    loading.value = true

    const resp = await megio.collections.readAll({
        recipe: recipeName,
        schema: true,
        currentPage: newPagination.currentPage,
        itemsPerPage: newPagination.itemsPerPage,
        orderBy: [
            { col: 'createdAt', desc: true },
            { col: 'id', desc: true }
        ]
    })

    loading.value = false

    return resp
}

async function handleFirstColumnClick(row: IRow) {
    await router.push({ name: 'megio.view.settings.admins.update', params: { id: row.id } })
}

async function handleAddButtonClick() {
    await router.push({ name: 'megio.view.settings.admins.create' })
}
</script>

<template>
    <Layout :loading="loading">
        <template v-slot:default>
            <div class="pa-7">
                <PageHeading
                    :breadcrumb="['Administrátoři']"
                    :btn-add-resources="[]"
                    @on-refresh="() => datagrid.refresh()"
                    @on-add="handleAddButtonClick"
                />
                <Datagrid
                    v-if="actions"
                    ref="datagrid"
                    class="mt-5"
                    :key="recipeName"
                    :loadFunction="loadFunction"
                    :rowActions="actions.row"
                    :bulkActions="actions.bulk"
                    :allowActionsFiltering="true"
                    :defaultItemsPerPage="15"
                    :btn-detail-resources="[]"
                    emptyDataMessage="Data nejsou k dispozici."
                    @onFirstColumnClick="handleFirstColumnClick"
                />
            </div>
        </template>

        <template v-slot:navigation>
            <SettingNav />
        </template>
    </Layout>
</template>