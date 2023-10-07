import { type IRow } from 'megio-api/types/collections'

export default interface ICollectionSummary {
    collectionName: string;
    onFirstColumnClick: (collection: string, row: IRow) => void;
}