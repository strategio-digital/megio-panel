<script setup lang="ts">
import { ref, inject } from 'vue'
import { type IPagination } from '@/api/collections/types/IPagination'
import { type IResp } from '@/api/collections/crud/show'
import { type IRow } from '@/api/collections/types/IRow'
import type IDatagridSettings from '@/components/datagrid/types/IDatagridSettings'
import type ICollectionSummary from '@/components/collection/types/ICollectionSummary'
import PageHeading from '@/components/layout/PageHeading.vue'
import Datagrid from '@/components/datagrid/Datagrid.vue'
import api from '@/api'

const props = defineProps<{ tableName: string }>()
const emits = defineEmits<{ (e: 'onLoadingChange', status: boolean): void }>()

const actions: IDatagridSettings['actions'] | undefined = inject('datagrid-actions')
const summaries: ICollectionSummary[] | undefined = inject('collection-summaries')

const loading = ref<boolean>(true)
const datagrid = ref()

async function loadFunction(newPagination: IPagination): Promise<IResp> {
    loading.value = true
    emits('onLoadingChange', loading.value)

    const resp = await api.collections.show({
        table: props.tableName,
        schema: true,
        currentPage: newPagination.currentPage,
        itemsPerPage: newPagination.itemsPerPage,
        orderBy: [
            { col: 'createdAt', desc: true },
            { col: 'id', desc: true }
        ]
    })

    loading.value = false
    emits('onLoadingChange', loading.value)

    return resp
}

function handleFirstColumnClick(row: IRow) {
    const custom = summaries?.filter(sum => sum.collectionName === props.tableName).shift()
    if (custom) {
        custom.onFirstColumnClick(props.tableName, row)
    } else {
        console.log('open sideModal by default')
    }
}

</script>

<template>
    <div class="h-100" v-show="!loading">
        <PageHeading v-if="!loading" :breadcrumb="['Kolekce', tableName]" @onRefresh="() => datagrid.refresh()" />
        <Datagrid
            v-if="actions"
            ref="datagrid"
            class="mt-5"
            :key="tableName"
            :loadFunction="loadFunction"
            :rowActions="actions.row"
            :bulkActions="actions.bulk"
            :allowActionsFiltering="true"
            :defaultItemsPerPage="15"
            :loading="loading"
            emptyDataMessage="Data nejsou k dispozici."
            @onFirstColumnClick="handleFirstColumnClick"
        />
    </div>
</template>