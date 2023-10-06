<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { mdiContentSaveOutline } from '@mdi/js'
import api from '@/api'
import useFormBuilder from '@/composables/form/useFormBuilder'
import FormFields from '@/components/form/FormFields.vue'
import { type IUser } from '@/api/auth/types/IUser'

const props = defineProps<{
    id: string,
    collection: string
}>()

const emit = defineEmits<{
    (e: 'close'): void
}>()

const { createFormFields, setFormValues, formFields } = useFormBuilder()

const loading = ref(true)
const valid = ref(false)
const item = ref<IUser>()

async function refresh() {
    loading.value = true

    const resp = await api.collections.showOne({
        table: props.collection,
        id: props.id,
        schema: true
    })

    // TODO: create by PHP-Entity
    createFormFields([
        { type: 'text', key: 'email', label: 'E-mail' },
        {
            type: 'select', key: 'role', label: 'Role', items: [
                { id: 'xyz', label: 'Admin' },
                { id: 'xyz', label: 'Registered' }
            ]
        },
        { type: 'datetime', key: 'createdAt', label: 'Vytvořeno'},
        { type: 'datetime', key: 'updatedAt', label: 'Naposledy upraveno', disabled: true },
        { type: 'datetime', key: 'lastLogin', label: 'Poslední přihlášení', disabled: true }
    ])

    setFormValues(resp.data)

    item.value = { ...resp.data } as IUser
    loading.value = false
}

async function onSubmit() {
    // TODO: update row in database
    console.log(formFields.value.filter(v => !v.disabled))
}

function handleClose() {
    emit('close')
}

onMounted(() => refresh())
</script>

<template>
    <div class="position-absolute w-100 h-100" style="z-index: -1">
        <div
            :class="[loading || 'invisible']"
            class="position-absolute w-100 h-100 d-flex justify-center align-center bg-overlay"
        >
            <v-progress-circular indeterminate :size="50" :width="5"/>
        </div>
    </div>

    <v-form validate-on="blur" v-model="valid" ref="form" @submit.prevent="onSubmit" class="h-100">
        <div class="px-7 d-flex align-center border-b" style="height: 100px">
            <div>
                <h3 class="font-weight-light mb-0">Upravit položku</h3>
                <div class="text-grey" style="font-size: .8rem"><span class="font-weight-bold">
                    {{ collection.toUpperCase() }}_ID:</span> {{ id }}
                </div>
            </div>
        </div>

        <div class="overflow-auto px-7 pt-5" style="height: calc(100% - 200px)">
            <FormFields :fields="formFields" />
        </div>

        <div class="border-t d-flex align-center justify-end px-7" style="height: 100px">

            <v-btn variant="plain" color="grey-darken-5" class="me-3" @click="handleClose">Zrušit</v-btn>

            <v-btn
                type="submit"
                variant="tonal"
                :prepend-icon="mdiContentSaveOutline"
            >
                Uložit
            </v-btn>
        </div>
    </v-form>
</template>