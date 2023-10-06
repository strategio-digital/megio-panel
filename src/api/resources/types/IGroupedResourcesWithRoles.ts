/**
 * Copyright (c) 2023 Strategio Digital s.r.o.
 * @author Jiří Zapletal (https://strategio.dev, jz@strategio.dev)
 */
import { type IResource } from '@/api/resources/types/IResource'
import { type IRole } from '@/api/resources/types/IRole'

export interface IGroupedResourcesWithRoles {
    groupName: string,
    resources: Array<IResource & {
        roles: IRole[],
    }>,
}