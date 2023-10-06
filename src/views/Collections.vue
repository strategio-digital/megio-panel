<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { mdiFolderOpenOutline, mdiFolderOutline } from '@mdi/js'
import { hasResource, hasRole } from '@/api/auth/currentUser'
import api from '@/api'
import { COLLECTION_EMPTY_ROUTE } from '@/components/navbar/types/Constants'
import Layout from '@/components/layout/Layout.vue'
import CollectionDatagrid from '@/components/collection/CollectionDatagrid.vue'

const route = useRoute()

const loading = ref(true)
const navbarLoading = ref(true)
const collections = ref<string[]>([])
const tableName = ref<string>(COLLECTION_EMPTY_ROUTE)

function isActive(routeName: string): boolean {
    return routeName === tableName.value
}

function handleLoading(status: boolean) {
    loading.value = status
}

watch(() => route.params.name, () => {
    const routeName = route.params.name.toString()

    if (routeName === COLLECTION_EMPTY_ROUTE && collections.value.length !== 0) {
        tableName.value = collections.value[0]
    } else {
        tableName.value = routeName
    }
})

onMounted(async () => {
    const resp = await api.collections.navbar()
    const routeName = route.params.name.toString()

    if (resp.success) {
        collections.value = resp.data.items

        if (routeName === COLLECTION_EMPTY_ROUTE && collections.value.length !== 0) {
            tableName.value = resp.data.items[0]
        } else {
            tableName.value = routeName
        }
    }

    navbarLoading.value = false
    loading.value = false
})
</script>

<template>
    <Layout :loading="loading">
        <template v-slot:default>
            <div class="pa-7 h-100">
                <CollectionDatagrid
                    v-if="collections.length !== 0"
                    :key="tableName"
                    :table-name="tableName"
                    @onLoadingChange="handleLoading"
                />

                <div v-if="!loading && collections.length === 0">
                    <v-breadcrumbs :items="['Kolekce']" class="pa-0 pt-3" style="font-size: 1.4rem" />
                    <div class="d-flex justify-center align-center">
                        <div class="border-0 border-t border-dashed w-100 py-5 mt-11 text-center">
                            Data nejsou k dispozici.
                        </div>
                    </div>
                </div>
            </div>
        </template>

        <template v-slot:navigation>
            <v-list density="comfortable">
                <template v-for="name in collections" :key="name">
                    <v-list-item
                        v-if="hasResource('saas.collection.nav.' + name)"
                        :title="name"
                        :value="name"
                        :to="{ name: 'saas.view.collections', params: { name: name }}"
                        :active="isActive(name)"
                        :prepend-icon="isActive(name) ? mdiFolderOpenOutline : mdiFolderOutline"
                    />
                </template>
            </v-list>

            <v-btn disabled v-if="!navbarLoading && hasRole('admin')" variant="tonal" class="w-100">
                Přidat kolekci
            </v-btn>

            <div class="d-flex" v-if="navbarLoading">
                <v-progress-circular indeterminate :size="30" :width="3" />
            </div>
        </template>
    </Layout>
</template>