import type { Row, ColumnSchema, ColumnProp } from 'megio-api/types/collections'

export default interface IColumnProps {
    value: any
    columnIndex: number
    columnSchema: ColumnProp
    tableSchema: ColumnSchema
    row: Row
}