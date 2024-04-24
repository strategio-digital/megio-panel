import { ref } from 'vue'
import { megio } from 'megio-api'
import { useRouter } from 'vue-router'
import { useToast } from '@/components/toast/useToast'
import type { IFormProp, IRespUpdate } from 'megio-api/types/collections'
import type { IUpdateForm } from '@/types'

export const useUpdateForm = (recipeName: string, rowId: string): IUpdateForm => {
    const router = useRouter()
    const toast = useToast()

    const loading = ref(true)
    const collectionName = ref<string>(recipeName)
    const formSchema = ref<IFormProp[]>([])

    async function load(): Promise<void> {
        const resp = await megio.collectionsExtra.updatingForm({
            recipe: collectionName.value,
            id: rowId
        })

        if (resp.success) {
            formSchema.value = resp.data.form
        }

        loading.value = false
    }

    async function save(data: Record<string, any>): Promise<IRespUpdate> {
        const resp = await megio.collections.update({
            recipe: collectionName.value,
            rows: [{
                id: rowId,
                data
            }]
        })

        if (resp.success) {
            toast.add('Záznam byl úspěšně upraven', 'success')
        }

        return resp
    }

    async function handleClickBack() {
        await router.push({ name: 'megio.view.collections', params: { name: collectionName.value } })
    }

    return {
        loading,
        formSchema,
        collectionName,
        load,
        save,
        handleClickBack
    }
}