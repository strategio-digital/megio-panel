import { type IRow } from '@/api/collections/types/IRow'

export default interface ICollectionSummary {
    collectionName: string;
    onFirstColumnClick: (collection: string, row: IRow) => void;
}