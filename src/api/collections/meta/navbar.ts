/**
 * Copyright (c) 2022 Strategio Digital s.r.o.
 * @author Jiří Zapletal (https://strategio.dev, jz@strategio.dev)
 */

import api from '@/api'
import { type IResponse } from '@/api/types/IResponse'

export interface IResp extends IResponse {
    data: {
        items: string[]
    }
}

const navbar = async (): Promise<IResp> => {
    const resp = await api.fetch(`saas/collections/navbar`, { method: 'POST' })
    return { ...resp, data: resp.data }
}

export default navbar