/**
 * Copyright (c) 2022 Strategio Digital s.r.o.
 * @author Jiří Zapletal (https://strategio.dev, jz@strategio.dev)
 */

import { type IResponse } from '@/api/types/IResponse'
import { type IRole } from '@/api/resources/types/IRole'
import api from '@/api'

export interface IResp extends IResponse {
    data: IRole
}

const createRole = async (name: string): Promise<IResp> => {
    const resp = await api.fetch(`saas/resources/create-role`, {
        method: 'POST',
        body: JSON.stringify({ name })
    })

    return { ...resp, data: resp.data }
}

export default createRole