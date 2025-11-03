import type { RespCreate, RespReadAll, RespUpdate, Row } from 'megio-api/types/collections'
import type { Router } from 'vue-router'
import type { Recipe } from 'megio-api/types'

export default interface ICollectionRecipe {
    recipeKey: string;

    onRowDetailClick?: (recipe: Recipe, router: Router, row: Row) => Promise<void>;
    onAddButtonClick?: (recipe: Recipe, router: Router) => Promise<void>;

    onReadAllResponse?: (recipe: Recipe, router: Router, resp: RespReadAll) => Promise<void>;
    onCreateFormResponse?: (recipe: Recipe, router: Router, resp: RespCreate) => Promise<RespCreate>;
    onUpdateFormResponse?: (recipe: Recipe, router: Router, resp: RespUpdate) => Promise<RespUpdate>;
}