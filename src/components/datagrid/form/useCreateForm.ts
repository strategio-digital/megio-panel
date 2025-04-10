import { ref } from 'vue'
import { megio } from 'megio-api'
import { useRouter } from 'vue-router'
import { useToast } from '@/components/toast/useToast'
import type { IFormProp, IRespCreate, IRespCreateForm } from 'megio-api/types/collections'
import type { ICreateForm, ICreateFormParams } from '@/types'
import type { IRecipe } from 'megio-api/types'

const initialRecipe = {
    key: 'loading',
    name: '...'
}

export const useCreateForm = (params: ICreateFormParams): ICreateForm => {
    const router = useRouter()
    const toast = useToast()

    const loading = ref(true)
    const recipe = ref<IRecipe>(initialRecipe)
    const formSchema = ref<IFormProp[]>([])

    async function load(): Promise<IRespCreateForm> {
        const resp = await megio.collectionsExtra.creatingForm({
            recipeKey: params.recipeKey
        })

        if (resp.success) {
            formSchema.value = resp.data.form
            recipe.value = resp.data.recipe
            console.log(recipe.value)
        }

        loading.value = false

        return resp
    }

    async function save(data: Record<string, any>): Promise<IRespCreate> {
        const resp = await megio.collections.create({
            recipeKey: params.recipeKey,
            rows: [data]
        })

        if (resp.success) {
            if (params?.onSave === undefined) {
                toast.add('Záznam byl úspěšně vytvořen', 'success')
                await router.push({
                    name: 'megio.view.collections.update',
                    params: {
                        name: params.recipeKey,
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
        await router.push({ name: 'megio.view.collections', params: { name: params.recipeKey } })
    }

    return {
        loading,
        formSchema,
        recipe,
        recipeKey: params.recipeKey,
        load,
        save,
        handleClickBack
    }
}