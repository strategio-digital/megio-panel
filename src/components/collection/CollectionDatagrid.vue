<script setup lang="ts">
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import { megio } from 'megio-api'
import PageHeading from '@/components/layout/PageHeading.vue'
import Datagrid from '@/components/datagrid/Datagrid.vue'
import type IDatagridSettings from '@/components/datagrid/types/IDatagridSettings'
import type ICollectionSummary from '@/components/collection/types/ICollectionSummary'
import type { IPagination, IRespReadAll, IRow } from 'megio-api/types/collections'

export type Props = { recipeName: string }
export type Emits = { (e: 'onLoadingChange', status: boolean): void}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const router = useRouter()
const actions = inject<IDatagridSettings['actions']>('datagrid-actions')
const summaries = inject<ICollectionSummary[]>('collection-summaries')

const loading = ref<boolean>(true)
const datagrid = ref()

async function loadFunction(newPagination: IPagination): Promise<IRespReadAll> {
    loading.value = true
    emits('onLoadingChange', loading.value)

    const resp = await megio.collections.readAll({
        recipe: props.recipeName,
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

async function handleFirstColumnClick(row: IRow) {
    const custom = summaries?.filter(sum => sum.collectionName === props.recipeName).shift()
    if (custom) {
        custom.onFirstColumnClick(props.recipeName, row)
    } else {
        await router.push({ name: 'megio.view.collections.update', params: { name: props.recipeName, id: row.id } })
    }
}

async function handleAddButtonClick() {
    await router.push({
        name: 'megio.view.collections.create',
        params: { name: props.recipeName }
    })
}
</script>

<template>
    <div class="h-100" v-show="!loading">
        <PageHeading
            v-if="!loading"
            :breadcrumb="['Kolekce', recipeName]"
            :btn-add-resources="[
                'megio.collection.form.creating',
                'megio.collection.data.create',
                `megio.collection.data.create.${recipeName}`
            ]"
            @onRefresh="() => datagrid.refresh()"
            @onAdd="handleAddButtonClick"
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
            :loading="loading"
            :btn-detail-resources="[
                'megio.collection.form.updating',
                'megio.collection.data.update',
                `megio.collection.data.update.${recipeName}`
            ]"
            emptyDataMessage="Data nejsou k dispozici."
            @onFirstColumnClick="handleFirstColumnClick"
        />
    </div>
</template>