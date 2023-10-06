/**
 * Copyright (c) 2022 Strategio Digital s.r.o.
 * @author Jiří Zapletal (https://strategio.dev, jz@strategio.dev)
 */

import api from '@/api'
import { type IResponse } from '@/api/types/IResponse'
import { type IShowParams } from '@/api/collections/types/IShowParams'
import { type IRow } from '@/api/collections/types/IRow'
import { type IPagination } from '@/api/collections/types/IPagination'
import { type ISchema } from '@/api/collections/types/ISchema'

export interface IResp extends IResponse {
    data: {
        pagination: IPagination
        items: IRow[]
        schema?: ISchema
    }
}

const show = async (params: IShowParams): Promise<IResp> => {
    const resp = await api.fetch(`saas/collections/show`, {
        method: 'POST',
        body: JSON.stringify(params)
    })

    return { ...resp, data: resp.data }
}

export default show