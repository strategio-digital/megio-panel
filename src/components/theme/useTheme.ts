import { computed, ref } from 'vue'

const themeStorage = localStorage.getItem('strategio_saas_theme')
const theme = ref(themeStorage || 'light')

const isDark = computed(() => theme.value === 'dark')

function switchTheme() {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    localStorage.setItem('strategio_saas_theme', theme.value)
}

export const useTheme = () => {
    return {
        theme,
        isDark,
        switchTheme
    }
}