<script setup lang="ts">
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import { megio } from 'megio-api'
import PageHeading from '@/components/layout/PageHeading.vue'
import Datagrid from '@/components/datagrid/Datagrid.vue'
import type IDatagridSettings from '@/components/datagrid/types/IDatagridSettings'
import type ICollectionRecipe from '@/components/collection/types/ICollectionRecipe'
import type { ISearch, IPagination, IRespReadAll, IRow } from 'megio-api/types/collections'
import type { IRecipe } from 'megio-api/types'

export type Props = { recipe: IRecipe }
export type Emits = { (e: 'onLoadingChange', status: boolean): void}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const router = useRouter()
const actions = inject<IDatagridSettings['actions']>('datagrid-actions')
const collections = inject<ICollectionRecipe[]>('collections')

const loading = ref<boolean>(true)
const datagrid = ref()

async function loadFunction(newPagination: IPagination, search?: ISearch, reset?: boolean): Promise<IRespReadAll> {
    loading.value = true
    emits('onLoadingChange', loading.value)

    const resp = await megio.collections.readAll({
        recipeKey: props.recipe.key,
        schema: true,
        currentPage: reset === true ? 1 : newPagination.currentPage,
        itemsPerPage: newPagination.itemsPerPage,
        orderBy: newPagination.orderBy,
        search
    })

    loading.value = false
    emits('onLoadingChange', loading.value)

    const custom = collections?.filter(sum => sum.recipeKey === props.recipe.key).shift()
    if (custom && custom.onReadAllResponse) {
        await custom.onReadAllResponse(props.recipe, router, resp)
    }

    return resp
}

async function handleRowDetailClick(row: IRow) {
    const custom = collections?.filter(sum => sum.recipeKey === props.recipe.key).shift()
    if (custom && custom.onRowDetailClick) {
        await custom.onRowDetailClick(props.recipe, router, row)
    } else {
        await router.push({ name: 'megio.view.collections.update', params: { name: props.recipe.key, id: row.id } })
    }
}

async function handleAddButtonClick() {
    const custom = collections?.filter(sum => sum.recipeKey === props.recipe.key).shift()
    if (custom && custom.onAddButtonClick) {
        await custom.onAddButtonClick(props.recipe, router)
    } else {
        await router.push({
            name: 'megio.view.collections.create',
            params: { name: props.recipe.key }
        })
    }
}
</script>

<template>
    <div class="h-100" v-show="!loading">
        <PageHeading
            v-if="!loading"
            :breadcrumb="[recipe.name]"
            :btn-add-resources="[
                'megio.collection.form.creating',
                'megio.collection.data.create',
                `megio.collection.data.create.${recipe.key}`
            ]"
            @onRefresh="() => datagrid.refresh()"
            @onAdd="handleAddButtonClick"
        />
        <Datagrid
            v-if="actions"
            ref="datagrid"
            class="mt-5"
            :key="recipe.key"
            :loadFunction="loadFunction"
            :rowActions="actions.row"
            :bulkActions="actions.bulk"
            :allowActionsFiltering="true"
            :defaultItemsPerPage="15"
            :loading="loading"
            :btn-detail-resources="[
                'megio.collection.form.updating',
                'megio.collection.data.update',
                `megio.collection.data.update.${recipe.key}`
            ]"
            emptyDataMessage="Data nejsou k dispozici."
            @onRowDetailClick="handleRowDetailClick"
        />
    </div>
</template>