import { toast } from 'vuetify-sonner'
import type { IToast } from '@/types'

export const useToast = (): IToast => {
    return {
        add: (message: string, color: 'error' | 'success' | 'warning', timeout: number | null = 7000) => {
            // @ts-ignore
            toast(message, {
                duration: timeout === null ? Number.POSITIVE_INFINITY : timeout,
                cardProps: { color },
                action: {
                    label: 'Close',
                    buttonProps: {
                        color: 'white'
                    },
                    onClick: () => {
                    }
                }
            })
        }
    }
}