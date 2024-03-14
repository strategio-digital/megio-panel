<script setup lang="ts">
import { ref } from 'vue'
import { megio } from 'megio-api'
import { useToast } from '@/components/toast/useToast'
import type { IRole } from 'megio-api/types/resources'

const props = defineProps<{ open: boolean }>()
const toast = useToast()
const loading = ref(false)
const roleName = ref<string>()
const valid = ref()

const schema = ref({
    role: [
        (v: string) => !! v || 'Název role je povinný',
        (v: string) => v.length >= 3 || 'Minimální délka názvu je 3 znaky',
        (v: string) => v.length <= 32 || 'Maximální délka názvu je 32 znaků'
    ]
})

const emits = defineEmits<{
    (e: 'onCancel'): void
    (e: 'onSuccess', role: IRole): void
}>()

async function onSubmit() {
    if (valid.value) {
        loading.value = true
        const resp = await megio.resources.createRole(roleName.value || '')
        loading.value = false

        if (resp.success) {
            roleName.value = undefined
            toast.add('Role byla úspěšně vytvořena', 'success')
            emits('onSuccess', resp.data)
        }
    }
}

</script>

<template>
    <v-dialog v-model="props.open" :max-width="500" :scrollable="true" :persistent="true">
        <v-form validate-on="blur" v-model="valid" ref="form" @submit.prevent="onSubmit">
            <v-card>
                <v-card-title class="text-h5 mt-3 px-5 pt-5 pb-0">
                    Vytvoření nové role
                </v-card-title>
                <v-card-text class="py-3 px-5" style="max-height: 300px">
                    <slot name="message">
                        <v-text-field
                            v-model="roleName"
                            :rules="schema.role"
                            :counter="32"
                            label="Název role"
                        />
                    </slot>
                </v-card-text>
                <v-card-actions class="justify-end">
                    <v-spacer></v-spacer>
                    <v-btn variant="tonal" color="" :disabled="loading" @click="emits('onCancel')">
                        <slot name="cancelText">Zrušit</slot>
                    </v-btn>
                    <v-btn type="submit" variant="tonal" color="primary" :loading="loading">
                        <slot name="acceptText">Uložit</slot>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </v-dialog>
</template>