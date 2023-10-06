/**
 * Copyright (c) 2022 Strategio Digital s.r.o.
 * @author Jiří Zapletal (https://strategio.dev, jz@strategio.dev)
 */

import api from '@/api'
import { type IResponse } from '@/api/types/IResponse'

export interface IResp extends IResponse {
    data: {
        message: string
    }
}

const revokeToken = async (user_ids: string[], source: string): Promise<IResp> => {
    const resp = await api.fetch(`saas/auth/revoke-token`, {
        method: 'POST',
        body: JSON.stringify({ source, user_ids })
    })

    return { ...resp, data: resp.data }
}

export default revokeToken