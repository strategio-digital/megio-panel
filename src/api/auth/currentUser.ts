import { type IAuthUser } from '@/api/auth/types/IAuthUser'

const currentUser = (): IAuthUser | null => {
    const data = localStorage.getItem('strategio_saas_user')
    return data ? JSON.parse(data) : null
}

export const currentUserResources = (): string[] => {
    const user = currentUser()
    return user?.user.resources || []
}

export const currentUserRoles = () => {
    const user = currentUser()
    return user?.user.roles || []
}

export const hasRole = (role: string): boolean => {
    return currentUserRoles().includes(role)
}

export const hasResource = (resource: string): boolean => {
    if (currentUserRoles().includes('admin')) {
        return true
    }

    return currentUserResources().includes(resource)
}

export const hasAllOfResources = (resources: string[]): boolean => {
    return resources.every(resource => hasResource(resource))
}

export const hasAnyOfResources = (resources: string[]): boolean => {
    return resources.some(resource => hasResource(resource))
}

export default currentUser