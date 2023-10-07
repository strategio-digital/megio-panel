<script lang="ts" setup>
import { ref, inject } from 'vue'
import { megio } from 'megio-api'
import Layout from '@/components/layout/Layout.vue'
import SettingNav from '@/components/navbar/SettingNav.vue'
import PageHeading from '@/components/layout/PageHeading.vue'
import Datagrid from '@/components/datagrid/Datagrid.vue'
import type IDatagridSettings from '@/components/datagrid/types/IDatagridSettings'
import type { IRespShow, IPagination, IRow } from 'megio-api/types/collections'

const collection = 'admin'
const actions: IDatagridSettings['actions'] | undefined = inject('datagrid-actions')
const loading = ref<boolean>(true)
const datagrid = ref()

async function loadFunction(newPagination: IPagination): Promise<IRespShow> {
    loading.value = true

    const resp = await megio.collections.show({
        table: collection,
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

function handleFirstColumnClick(row: IRow) {
    console.log('go to detail on admin', row.id)
}
</script>

<template>
    <Layout :loading="loading">
        <template v-slot:default>
            <div class="pa-7">
                <PageHeading :breadcrumb="['Administrátoři']" @onRefresh="() => datagrid.refresh()" />
                <Datagrid
                    v-if="actions"
                    ref="datagrid"
                    class="mt-5"
                    :key="collection"
                    :loadFunction="loadFunction"
                    :rowActions="actions.row"
                    :bulkActions="actions.bulk"
                    :allowActionsFiltering="true"
                    :defaultItemsPerPage="15"
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