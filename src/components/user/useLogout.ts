import { useRouter } from 'vue-router'
import { useToast } from '@/components/toast/useToast'
import { megio } from 'megio-api'

export const useLogout = () => {
    const router = useRouter()
    const toast = useToast()

    async function logout() {
        const name = megio.auth.user.hasRole('admin') ? 'saas.view.admin.login' : 'saas.view.login'
        megio.auth.logout()
        await router.push({ name })
        toast.add('Právě jste se úspěšně odhlásili', 'warning')
    }

    return {
        logout
    }
}