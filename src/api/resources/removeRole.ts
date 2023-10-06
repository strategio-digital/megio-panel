/**
 * Copyright (c) 2022 Strategio Digital s.r.o.
 * @author Jiří Zapletal (https://strategio.dev, jz@strategio.dev)
 */

import { type IResponse } from '@/api/types/IResponse'
import api from '@/api'

export interface IResp extends IResponse {
    data: {
        message: string
    }
}

const removeRole = async (roleId: string): Promise<IResp> => {
    const resp = await api.fetch(`saas/resources/delete-role`, {
        method: 'DELETE',
        body: JSON.stringify({ id: roleId })
    })

    return { ...resp, data: resp.data }
}

export default removeRole