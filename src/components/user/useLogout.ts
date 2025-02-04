import { useRouter } from 'vue-router'
import { useToast } from '@/components/toast/useToast'
import { megio } from 'megio-api'

export const useLogout = () => {
    const router = useRouter()
    const toast = useToast()

    async function logout() {
        const name: string = megio.auth.user.hasRole('admin') ? 'megio.view.admin.login' : 'megio.view.login'
        megio.auth.logout()
        await router.push({ name })
        toast.add('Právě došlo k odhlášení', 'warning')
    }

    return {
        logout
    }
}