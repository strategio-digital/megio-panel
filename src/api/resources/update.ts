/**
 * Copyright (c) 2022 Strategio Digital s.r.o.
 * @author Jiří Zapletal (https://strategio.dev, jz@strategio.dev)
 */

import { type IResponse } from '@/api/types/IResponse'
import { type IResponseData } from '@/api/resources/types/IResponseData'
import api from '@/api'

export interface IResp extends IResponse {
    data: IResponseData
}

const update = async (viewResources: string[]): Promise<IResp> => {
    const resp = await api.fetch(`saas/resources/update`, {
        method: 'POST',
        body: JSON.stringify({
            view_resources: viewResources,
            make_view_diff: true
        })
    })

    return { ...resp, data: resp.data }
}

export default update