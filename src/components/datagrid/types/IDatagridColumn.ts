import { type Component } from 'vue';

export default interface IDatagridColumn {
    rendererName: string,
    component: Component
}