<script lang="ts" setup>
import { ref, inject } from 'vue'
import { megio } from 'megio-api'
import { useComponents, useRouter } from 'megio-panel'
import type { IDatagridSettings } from 'megio-panel/types'
import type { IRespReadAll, IPagination, IRow } from 'megio-api/types/collections'

const router = useRouter()
const { MDatagrid, MLayout, MPageHeading } = useComponents()

const recipeName = 'user'
const actions = inject<IDatagridSettings['actions']>('datagrid-actions')
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
    await router.push({ name: 'app.view.users.update', params: { id: row.id } })
}

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