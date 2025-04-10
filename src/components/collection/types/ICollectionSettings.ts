import { type Router } from 'vue-router'
import type ICollectionRecipe from '@/components/collection/types/ICollectionRecipe.ts'

export default interface ICollectionSettings {
    collections: (router: Router) => ICollectionRecipe[]
}