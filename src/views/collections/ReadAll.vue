<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { megio } from 'megio-api'
import { type IRecipe } from 'megio-api/types'
import { mdiFolderOpenOutline, mdiFolderOutline } from '@mdi/js'
import { COLLECTION_EMPTY_ROUTE } from '@/components/navbar/types/Constants'
import Layout from '@/components/layout/Layout.vue'
import CollectionDatagrid from '@/components/collection/CollectionDatagrid.vue'

const route = useRoute()
const defaultRecipe: IRecipe = { name: COLLECTION_EMPTY_ROUTE, key: COLLECTION_EMPTY_ROUTE }

const loading = ref(true)
const navbarLoading = ref(true)
const recipes = ref<IRecipe[]>([])
const currentRecipe = ref<IRecipe>(defaultRecipe)

function isActive(routeName: string): boolean {
    return routeName === currentRecipe.value.key
}

function handleLoading(status: boolean) {
    loading.value = status
}

watch(() => route.params.name, () => {
    const routeName = route.params.name.toString()

    if (routeName === COLLECTION_EMPTY_ROUTE && recipes.value.length !== 0) {
        currentRecipe.value = recipes.value[0]
    } else {
        //recipe.value = collections.value.find<IRecipe>(item => item.key === routeName)
        currentRecipe.value = recipes.value.find(item => item.key === routeName) || defaultRecipe
    }
})

onMounted(async () => {
    const resp = await megio.collectionsExtra.navbar()
    const routeName = route.params.name.toString()

    if (resp.success) {
        recipes.value = resp.data.items

        if (routeName === COLLECTION_EMPTY_ROUTE && recipes.value.length !== 0) {
            currentRecipe.value = resp.data.items[0]
        } else {
            currentRecipe.value = recipes.value.find(item => item.key === routeName) || defaultRecipe
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
                    v-if="recipes.length !== 0"
                    :key="currentRecipe.key"
                    :recipe="currentRecipe"
                    @onLoadingChange="handleLoading"
                />

                <div v-if="!loading && recipes.length === 0">
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
                <template v-for="item in recipes" :key="item.key">
                    <v-list-item
                        v-if="megio.auth.user.hasResource('megio.collection.nav.' + item.key)"
                        :title="item.name"
                        :value="item.key"
                        :to="{ name: 'megio.view.collections', params: { name: item.key }}"
                        :active="isActive(item.key)"
                        :prepend-icon="isActive(item.key) ? mdiFolderOpenOutline : mdiFolderOutline"
                    />
                </template>
            </v-list>

            <div class="d-flex" v-if="navbarLoading">
                <v-progress-circular indeterminate :size="30" :width="3" />
            </div>
        </template>
    </Layout>
</template>