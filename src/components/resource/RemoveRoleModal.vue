<script setup lang="ts">
import { ref } from 'vue'
import { useToast } from '@/components/toast/useToast'
import { megio } from 'megio-api'
import type { IRole } from 'megio-api/types/resources'

export type Props = {
    open: boolean,
    role: IRole
}

export type Emits = {
    (e: 'onCancel'): void
    (e: 'onAccept', role: IRole): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const toast = useToast()
const loading = ref(false)

async function handleAccept() {
    loading.value = true
    const resp = await megio.resources.deleteRole(props.role.id)
    loading.value = false

    if (resp.success) {
        toast.add(resp.data.message, 'warning')
        emits('onAccept', props.role)
    }
}

</script>

<template>
    <v-dialog v-model="props.open" :max-width="500" :scrollable="true" :persistent="true">
        <v-card>
            <v-card-title class="text-h5 mt-3 px-5 pt-5 pb-0">
                Odebrání role
            </v-card-title>
            <v-card-text class="py-3 px-5" style="max-height: 300px">
                <slot name="message">
                    <div class="mb-2">
                        Opravdu si přejete odebrat roli <strong>{{ role.name }}</strong>?
                    </div>
                </slot>
            </v-card-text>
            <v-card-actions class="justify-end">
                <v-spacer></v-spacer>
                <v-btn variant="tonal" color="" :disabled="loading" @click="emits('onCancel')">
                    <slot name="cancelText">Zrušit</slot>
                </v-btn>
                <v-btn variant="tonal" color="error" :loading="loading" @click="handleAccept">
                    <slot name="acceptText">Potvrdit</slot>
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>