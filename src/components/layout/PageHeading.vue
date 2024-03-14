<script setup lang="ts">
import { mdiPlus, mdiRefresh } from '@mdi/js'

defineProps<{ breadcrumb: string[] }>()
const emits = defineEmits<{
    (e: 'onRefresh'): void
    (e: 'onAdd'): void
    (e: 'onEdit'): void
}>()
</script>

<template>
    <div class="d-flex justify-space-between align-center">
        <v-breadcrumbs :items="breadcrumb" class="pa-0" style="font-size: 1.4rem" />

        <div class="d-flex ms-3">
            <v-tooltip location="top" text="Obnovit data" offset="-5">
                <template v-slot:activator="{ props }">
                    <v-btn
                        v-bind="props"
                        variant="plain"
                        :icon="mdiRefresh"
                        size="small"
                        color=""
                        @click="emits('onRefresh')"
                    ></v-btn>
                </template>
            </v-tooltip>

            <v-btn :disabled="true" variant="tonal" :prepend-icon="mdiPlus" class="ms-3" @click="emits('onAdd')">
                Přidat
            </v-btn>
        </div>
    </div>
</template>