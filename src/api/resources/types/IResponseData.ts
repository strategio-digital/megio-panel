/**
 * Copyright (c) 2023 Strategio Digital s.r.o.
 * @author Jiří Zapletal (https://strategio.dev, jz@strategio.dev)
 */
import { type IRole } from '@/api/resources/types/IRole'
import { type IResource } from '@/api/resources/types/IResource'
import { type IGroupedResourcesWithRoles } from '@/api/resources/types/IGroupedResourcesWithRoles'
import { type IResourceDiff } from '@/api/resources/types/IResourceDiff'

export interface IResponseData {
    roles: IRole[],
    resources: IResource[],
    grouped_resources_with_roles: IGroupedResourcesWithRoles[],
    resources_diff: IResourceDiff
}