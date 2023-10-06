import type IFormSelectItem from '@/composables/form/IFormSelectItem'

export default interface IFormField {
    type: 'text' | 'select' | 'datetime',
    key: string,
    label: string
    disabled?: boolean
    value?: any
    items?: IFormSelectItem[]
}