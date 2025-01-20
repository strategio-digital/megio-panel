import type IDatagridSettings from '@/components/datagrid/types/IDatagridSettings'

const actions: IDatagridSettings['actions'] = {
    bulk: [
        {
            name: 'remove',
            label: 'Odstranit',
            showOn: ['/collections', '/settings/admins', '/settings/queue']
        },
        {
            name: 'revoke',
            label: 'Odhlásit',
            showOn: ['/settings/admins']
        }
    ],
    row: [
        {
            name: 'remove',
            label: 'Odstranit',
            showOn: ['/collections', '/settings/admins', '/settings/queue']
        },
        {
            name: 'revoke',
            label: 'Odhlásit',
            showOn: ['/settings/admins']
        }
    ]
}

export default actions