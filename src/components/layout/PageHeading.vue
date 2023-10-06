<script setup lang="ts">
import { hasRole } from '@/api/auth/currentUser'

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
                        icon="mdi-refresh"
                        size="small"
                        color=""
                        @click="emits('onRefresh')"
                    ></v-btn>
                </template>
            </v-tooltip>

            <v-tooltip v-if="hasRole('admin')" location="top" text="Upravit kolekci" offset="-5">
                <template v-slot:activator="{ props }">
                    <v-btn
                        v-bind="props"
                        variant="plain"
                        icon="mdi-cog"
                        size="small"
                        color=""
                        @click="emits('onEdit')"
                    ></v-btn>
                </template>
            </v-tooltip>

            <v-btn variant="tonal" prepend-icon="mdi-plus" class="ms-3" @click="emits('onAdd')">
                Přidat
            </v-btn>
        </div>
    </div>
</template>