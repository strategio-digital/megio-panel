import { type Router } from 'vue-router'
import type ICollectionSummary from '@/components/collection/types/ICollectionSummary'

const summaries = (router: Router): ICollectionSummary[] => {
    return [
        // {
        //     collectionName: 'admin',
        //     onFirstColumnClick: (collection: string, row: IRow) => router.push({
        //         name: 'saas.view.settings.admins'
        //         //params: { id: row.id }
        //     })
        // }
    ]
}

export default summaries