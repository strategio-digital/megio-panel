import type { IRow, IColumnSchema, IColumnProp } from 'megio-api/types/collections'

export default interface IColumnProps {
    value: any
    columnIndex: number
    columnSchema: IColumnProp
    tableSchema: IColumnSchema
    row: IRow
}