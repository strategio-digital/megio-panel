import { type Router } from 'vue-router'
import type ICollectionRecipe from '@/components/collection/types/ICollectionRecipe'

export default interface ICollectionSettings {
    recipes: (router: Router) => ICollectionRecipe[]
}