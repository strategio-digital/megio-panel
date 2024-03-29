<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { megio } from 'megio-api'
import { mdiFolderOpenOutline, mdiFolderOutline } from '@mdi/js'
import { COLLECTION_EMPTY_ROUTE } from '@/components/navbar/types/Constants'
import Layout from '@/components/layout/Layout.vue'
import CollectionDatagrid from '@/components/collection/CollectionDatagrid.vue'

const route = useRoute()

const loading = ref(true)
const navbarLoading = ref(true)
const collections = ref<string[]>([])
const recipeName = ref<string>(COLLECTION_EMPTY_ROUTE)

function isActive(routeName: string): boolean {
    return routeName === recipeName.value
}

function handleLoading(status: boolean) {
    loading.value = status
}

watch(() => route.params.name, () => {
    const routeName = route.params.name.toString()

    if (routeName === COLLECTION_EMPTY_ROUTE && collections.value.length !== 0) {
        recipeName.value = collections.value[0]
    } else {
        recipeName.value = routeName
    }
})

onMounted(async () => {
    const resp = await megio.collectionsExtra.navbar()
    const routeName = route.params.name.toString()

    if (resp.success) {
        collections.value = resp.data.items

        if (routeName === COLLECTION_EMPTY_ROUTE && collections.value.length !== 0) {
            recipeName.value = resp.data.items[0]
        } else {
            recipeName.value = routeName
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
                    :key="recipeName"
                    :recipe-name="recipeName"
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
                        v-if="megio.auth.user.hasResource('megio.collection.nav.' + name)"
                        :title="name"
                        :value="name"
                        :to="{ name: 'megio.view.collections', params: { name: name }}"
                        :active="isActive(name)"
                        :prepend-icon="isActive(name) ? mdiFolderOpenOutline : mdiFolderOutline"
                    />
                </template>
            </v-list>

            <div class="d-flex" v-if="navbarLoading">
                <v-progress-circular indeterminate :size="30" :width="3" />
            </div>
        </template>
    </Layout>
</template>