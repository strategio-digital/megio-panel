/**
 * Copyright (c) 2022 Strategio Digital s.r.o.
 * @author Jiří Zapletal (https://strategio.dev, jz@strategio.dev)
 */

import api from '@/api'
import { type IResponse } from '@/api/types/IResponse'
import { type IRemoveParams } from '@/api/collections/types/IRemoveParams'

export interface IResp extends IResponse {
    data: {
        message: string
    }
}

const remove = async (params: IRemoveParams): Promise<IResp> => {
    const resp = await api.fetch(`saas/collections/delete`, {
        method: 'DELETE',
        body: JSON.stringify(params)
    })

    return { ...resp, data: resp.data }
}

export default remove