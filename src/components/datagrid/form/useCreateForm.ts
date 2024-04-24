import { ref } from 'vue'
import { megio } from 'megio-api'
import { useRouter } from 'vue-router'
import { useToast } from '@/components/toast/useToast'
import type { IFormProp, IRespCreate } from 'megio-api/types/collections'
import type { ICreateForm, ICreateFormParams } from '@/types'

export const useCreateForm = (params: ICreateFormParams): ICreateForm => {
    const router = useRouter()
    const toast = useToast()

    const loading = ref(true)
    const collectionName = ref<string>(params.recipe)
    const formSchema = ref<IFormProp[]>([])

    async function load(): Promise<void> {
        const resp = await megio.collectionsExtra.creatingForm({
            recipe: collectionName.value
        })

        if (resp.success) {
            formSchema.value = resp.data.form
        }

        loading.value = false
    }

    async function save(data: Record<string, any>): Promise<IRespCreate> {
        const resp = await megio.collections.create({
            recipe: collectionName.value,
            rows: [data]
        })

        if (resp.success) {
            if (params?.onSave === undefined) {
                toast.add('Záznam byl úspěšně vytvořen', 'success')
                await router.push({
                    name: 'megio.view.collections.update',
                    params: {
                        name: collectionName.value,
                        id: resp.data.ids?.[0]
                    }
                })
            } else {
                params.onSave(resp.data)
            }
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