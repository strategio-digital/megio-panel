import { useRouter } from 'vue-router'
import { useToast } from '@/components/toast/useToast'
import api from '@/api'
import { hasRole } from '@/api/auth/currentUser'

export const useLogout = () => {
    const router = useRouter()
    const toast = useToast()

    async function logout() {
        const name = hasRole('admin') ? 'saas.view.admin.login' : 'saas.view.login'
        api.auth.logout()
        await router.push({ name })
        toast.add('Právě jste se úspěšně odhlásili', 'warning')
    }

    return {
        logout
    }
}