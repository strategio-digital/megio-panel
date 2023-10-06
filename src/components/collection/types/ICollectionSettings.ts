import { type Router } from 'vue-router'
import type ICollectionSummary from '@/components/collection/types/ICollectionSummary'

export default interface ICollectionSettings {
    summaries: (router: Router) => ICollectionSummary[]
}