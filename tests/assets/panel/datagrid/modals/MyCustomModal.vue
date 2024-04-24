<script setup lang="ts">
import { ref } from 'vue'
import { megio } from 'megio-api'
import { useToast, useVuetify } from 'megio-panel'
import type { IRow } from 'megio-api/types/collections'

// Vuetify
const { VDialog, VSpacer, VBtn, VChip, VCard, VCardTitle, VCardText, VCardActions } = useVuetify()

// Vyskakoací notifikace
const toast = useToast()

// Dostupné props
const props = defineProps<{
    open: boolean
    rows: IRow[],
    recipe: string
}>()

// Dostupné emits
const emits = defineEmits<{ (e: 'onAccept'): void, (e: 'onCancel'): void }>()

// Reaktivní proměnná pro loading state
const loading = ref<boolean>(false)

// Asynchronní zpracování accept akce
async function handleAccept() {
    loading.value = true

    const resp = await megio.collections.delete({
        recipe: props.recipe,
        ids: props.rows.map(row => row.id)
    })

    loading.value = false

    if (resp.success) {
        toast.add('Položka byla úspěšně odstraněna', 'warning')
        emits('onAccept')
    }
}
</script>

<template>
    <v-dialog v-model="props.open" :max-width="500" :scrollable="true" :persistent="true">
        <v-card>
            <v-card-title class="text-h5 mt-3 px-5 pt-5 pb-0">
                Testovací modal
            </v-card-title>
            <v-card-text class="py-3 px-5" style="max-height: 300px">
                <div class="mb-5">
                    Opravdu si přejete odstranit {{ rows.length === 1 ? 'tuto položku' : 'tyto položky' }}?
                </div>
                <v-chip class="me-2 mb-2" size="small" v-for="row in rows">
                    {{ row.id }}
                </v-chip>
            </v-card-text>
            <v-card-actions class="justify-end">
                <v-spacer></v-spacer>
                <v-btn variant="tonal" color="" :disabled="loading" @click="emits('onCancel')">
                    Zrušit
                </v-btn>
                <v-btn variant="tonal" color="error" :loading="loading" @click="handleAccept">
                    Potvrdit
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>