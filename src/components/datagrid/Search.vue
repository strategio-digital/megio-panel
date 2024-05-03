<script setup lang="ts">
import { computed, ref } from 'vue'
import { mdiCloseCircle, mdiMagnify } from '@mdi/js'
import type { ISearch, ISearchable } from 'megio-api/types/collections'

export type Props = {
    loading: boolean,
    searchables: ISearchable[],
    active: boolean
}

export type Emits = {
    (e: 'onSearchStart', search: ISearch): void,
    (e: 'onClear'): void,
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const text = ref<ISearch['text']>('')

const enabled = computed(() => text.value !== '' || props.active)
const placeholder = computed(() => props.searchables.map(s => {
    if (s.relation !== null) {
        return `${s.relation.replace(/s$/, '')}.${s.column}`
    }
    return s.column
}).join(', '))


async function search() {
    emits('onSearchStart', {
        text: text.value,
    })
}

function clear() {
    text.value = ''
    emits('onClear')
}
</script>

<template>
    <div class=" rounded-xl bg-grey-lighten-5 pa-2 my-8">
        <div class="d-flex align-center" style="column-gap: .5rem">
            <v-text-field
                v-model="text"
                :prepend-icon="mdiMagnify"
                :disabled="loading"
                persistent-clear
                density="compact"
                variant="plain"
                hide-details
                rounded
                class="px-3 pb-2 rounded-xl"
                :placeholder="placeholder"
            />
            <v-btn
                v-if="enabled"
                @click="clear"
                :disabled="loading"
                :icon="mdiCloseCircle"
                color="grey"
                size="sm"
                variant="text"
            />
            <v-btn
                @click="search"
                :loading="loading"
                :disabled="loading || !enabled"
                variant="tonal"
                color="green"
                rounded
            >
                Vyhledat
            </v-btn>
<!--            <div class="position-relative">-->
<!--                <v-badge-->
<!--                    v-if="filters.length !== 0 && !loading"-->
<!--                    :content="filters.length"-->
<!--                    color="orange"-->
<!--                    class="position-absolute"-->
<!--                    style="right: 0; z-index: 1"-->
<!--                />-->
<!--                <v-btn :disabled="loading" variant="tonal" color="orange" rounded>-->
<!--                    Filtry-->
<!--                </v-btn>-->
<!--            </div>-->
        </div>
    </div>
</template>