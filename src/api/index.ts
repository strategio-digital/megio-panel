import loginByEmail from '@/api/auth/loginByEmail'
import logout from '@/api/auth/logout'
import currentUser from '@/api/auth/currentUser'
import show from '@/api/collections/crud/show'
import showOne from '@/api/collections/crud/showOne'
import remove from '@/api/collections/crud/remove'
import revokeToken from '@/api/auth/revokeToken'
import navbar from '@/api/collections/meta/navbar'
import showResources from '@/api/resources/show'
import updateResources from '@/api/resources/update'
import updateRole from '@/api/resources/updateRole'
import removeRole from '@/api/resources/removeRole'
import createRole from '@/api/resources/createRole'

import { type IResponse } from '@/api/types/IResponse'
import { useToast } from '@/components/toast/useToast'

const endpoint = 'http://localhost:8090/'
const toast = useToast()

const fetchApi = async (uri: string, options: RequestInit): Promise<IResponse> => {
    const url = endpoint + uri
    const info: RequestInit = {
        ...options,
        headers: {
            ...options?.headers,
            'Content-Type': 'application/json'
        }
    }

    const user = currentUser()

    if (user) {
        info.headers = { ...info.headers, 'Authorization': `Bearer ${user.bearer_token}` }
    }

    const resp = await fetch(url, info)
    const json = await resp.json()

    if (resp.status < 200 || resp.status > 299) {
        json.errors.map((message: string) => toast.add(message, 'error'))
    }

    return {
        success: resp.ok,
        data: json,
        errors: json.errors ? json.errors : []
    }
}

export default {
    fetch: fetchApi,
    collections: {
        show,
        showOne,
        remove,
        navbar
    },
    auth: {
        currentUser,
        loginByEmail,
        logout,
        revokeToken
    },
    resources: {
        show: showResources,
        update: updateResources,
        createRole,
        updateRole,
        removeRole,
    }
}