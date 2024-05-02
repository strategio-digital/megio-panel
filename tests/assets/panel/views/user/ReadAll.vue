<script lang="ts" setup>
import { ref, inject } from 'vue'
import { megio } from 'megio-api'
import { useComponents, useRouter } from 'megio-panel'
import type { IDatagridSettings } from 'megio-panel/types'
import type { IRespReadAll, IPagination, IRow, IOrderBy } from 'megio-api/types/collections'

// Vue router z `megio-panel`
const router = useRouter()

// Megio komponenty z `megio-panel`
const { MDatagrid, MLayout, MPageHeading } = useComponents()

// Název kolekce pro načtení dat
const recipeName = 'user'

// Načtení akcí pro datagrid
const actions = inject<IDatagridSettings['actions']>('datagrid-actions')

// Definice proměnných
const loading = ref<boolean>(true)
const datagrid = ref()

// Load callback pro datagrid
async function loadFunction(
    newPagination: IPagination,
    orderBy: IOrderBy[]
): Promise<IRespReadAll> {
    loading.value = true

    const resp = await megio.collections.readAll({
        recipe: recipeName,
        schema: true,
        currentPage: newPagination.currentPage,
        itemsPerPage: newPagination.itemsPerPage,
        orderBy
    })

    loading.value = false

    return resp
}

// Event pro otevření detailu uživatele
async function handleFirstColumnClick(row: IRow) {
    await router.push({
        name: 'app.view.users.update',
        params: {
            id: row.id
        }
    })
}

// Event pro otevření formuláře pro vytvoření uživatele
async function handleAddButtonClick() {
    await router.push({ name: 'app.view.users.create' })
}
</script>

<template>
    <MLayout :loading="loading">
        <template v-slot:default>
            <div class="pa-7">
                <MPageHeading
                    :breadcrumb="['Uživatelé']"
                    :btn-add-resources="[]"
                    @on-add="handleAddButtonClick"
                    @on-refresh="() => datagrid.refresh()"
                />
                <MDatagrid
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
    </MLayout>
</template>