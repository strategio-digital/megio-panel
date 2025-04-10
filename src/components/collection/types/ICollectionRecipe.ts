import type { IRespCreate, IRespReadAll, IRespUpdate, IRow } from 'megio-api/types/collections'
import type { Router } from 'vue-router'
import type { IRecipe } from 'megio-api/types'

export default interface ICollectionRecipe {
    recipeKey: string;

    onRowDetailClick?: (recipe: IRecipe, router: Router, row: IRow) => Promise<void>;
    onAddButtonClick?: (recipe: IRecipe, router: Router) => Promise<void>;

    onReadAllResponse?: (recipe: IRecipe, router: Router, resp: IRespReadAll) => Promise<void>;
    onCreateFormResponse?: (recipe: IRecipe, router: Router, resp: IRespCreate) => Promise<IRespCreate>;
    onUpdateFormResponse?: (recipe: IRecipe, router: Router, resp: IRespUpdate) => Promise<IRespUpdate>;
}