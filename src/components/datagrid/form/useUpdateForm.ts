import { inject, ref } from 'vue'
import { megio } from 'megio-api'
import { useRouter } from 'vue-router'
import { useToast } from '@/components/toast/useToast'
import type { IFormProp, IRespUpdate, IRespUpdateForm } from 'megio-api/types/collections'
import type { IUpdateForm } from '@/types'
import type { IRecipe } from 'megio-api/types'
import type ICollectionRecipe from '@/components/collection/types/ICollectionRecipe'

const initialRecipe = {
    key: 'loading',
    name: '...'
}

export const useUpdateForm = (recipeKey: string, rowId: string): IUpdateForm => {
    const collections = inject<ICollectionRecipe[]>('collections')

    const router = useRouter()
    const toast = useToast()

    const loading = ref(true)
    const recipe = ref<IRecipe>(initialRecipe)
    const formSchema = ref<IFormProp[]>([])

    async function load(): Promise<IRespUpdateForm> {
        const resp = await megio.collectionsExtra.updatingForm({
            recipeKey,
            id: rowId
        })

        if (resp.success) {
            formSchema.value = resp.data.form
            recipe.value = resp.data.recipe
        }

        loading.value = false

        return resp
    }

    async function save(data: Record<string, any>): Promise<IRespUpdate> {
        const resp = await megio.collections.update({
            recipeKey: recipeKey,
            rows: [{
                id: rowId,
                data
            }]
        })

        const custom = collections?.filter(sum => sum.recipeKey === recipeKey).shift()
        if (custom && custom.onUpdateFormResponse) {
            return await custom.onUpdateFormResponse(recipe.value, router, resp)
        }

        if (resp.success) {
            toast.add('Záznam byl úspěšně upraven', 'success')
        }

        return resp
    }

    async function handleClickBack() {
        await router.push({ name: 'megio.view.collections', params: { name: recipeKey } })
    }

    return {
        loading,
        formSchema,
        recipe,
        recipeKey,
        load,
        save,
        handleClickBack
    }
}