<script lang="ts" setup>
import { ref, inject } from 'vue'
import { megio } from 'megio-api'
import { useRouter } from 'vue-router'
import Layout from '@/components/layout/Layout.vue'
import SettingNav from '@/components/navbar/SettingNav.vue'
import PageHeading from '@/components/layout/PageHeading.vue'
import Datagrid from '@/components/datagrid/Datagrid.vue'
import type IDatagridSettings from '@/components/datagrid/types/IDatagridSettings'
import type { IRespReadAll, IPagination, IRow, ISearch } from 'megio-api/types/collections'

const router = useRouter()

const recipeName = 'queue'
const actions = inject<IDatagridSettings['actions']>('datagrid-actions')
const loading = ref<boolean>(true)
const datagrid = ref()

async function loadFunction(newPagination: IPagination, search?: ISearch, reset?: boolean): Promise<IRespReadAll> {
    loading.value = true

    const resp = await megio.collections.readAll({
        recipeKey: recipeName,
        schema: true,
        currentPage: reset === true ? 1 : newPagination.currentPage,
        itemsPerPage: newPagination.itemsPerPage,
        orderBy: newPagination.orderBy,
        search
    })

    loading.value = false

    return resp
}

async function handleFirstColumnClick(row: IRow) {
    await router.push({ name: 'megio.view.settings.queue.update', params: { id: row.id } })
}

async function handleAddButtonClick() {
    await router.push({ name: 'megio.view.settings.queue.create' })
}
</script>

<template>
    <Layout :loading="loading">
        <div class="pa-7">
            <PageHeading
                :breadcrumb="['Fronty a workery']"
                :btnAddResources="[]"
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
                :btnDetailResources="[]"
                emptyDataMessage="Data nejsou k dispozici."
                @onRowDetailClick="handleFirstColumnClick"
            />
        </div>
        <template v-slot:navigation>
            <SettingNav />
        </template>
    </Layout>
</template>