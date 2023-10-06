/**
 * Copyright (c) 2022 Strategio Digital s.r.o.
 * @author Jiří Zapletal (https://strategio.dev, jz@strategio.dev)
 */

import { type IResponse } from '@/api/types/IResponse'
import { type IResource } from '@/api/resources/types/IResource'
import { type IRole } from '@/api/resources/types/IRole'
import { type IGroupedResourcesWithRoles } from '@/api/resources/types/IGroupedResourcesWithRoles'
import { type IResourceDiff } from '@/api/resources/types/IResourceDiff'
import api from '@/api'

export interface IResp extends IResponse {
    data: {
        message: string
    }
}

const updateRole = async (roleId: string, resourceId: string, enable: boolean): Promise<IResp> => {
    const resp = await api.fetch(`saas/resources/update-role`, {
        method: 'POST',
        body: JSON.stringify({
            role_id: roleId,
            resource_id: resourceId,
            enable
        })
    })

    return { ...resp, data: resp.data }
}

export default updateRole