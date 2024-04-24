<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { megio } from 'megio-api'
import { useToast } from '@/components/toast/useToast'

export type Props = { source: string, title: string }
const props = defineProps<Props>()

const toast = useToast()
const router = useRouter()
const loading = ref(false)
const valid = ref()

const schema = ref({
    email: [
        (v: string) => !! v || 'E-mail je povinný',
        (v: string) => /.+@.+/.test(v) || 'E-mail není validní '
    ],
    password: [
        (v: string) => !! v || 'Heslo je povinné'
    ]
})

const data = ref({ email: '', password: '' })

async function onSubmit() {
    if (valid.value) {
        loading.value = true

        const resp = await megio.auth.loginByEmail(data.value.email, data.value.password, props.source)

        if (resp.success && (resp.data.user.resources?.length !== 0 || resp.data.user.roles.includes('admin'))) {
            await router.push({ name: 'megio.view.dashboard' })
            toast.add('Právě jste se úspěšně přihlásili', 'success')
        } else if (resp.success) {
            toast.add('Nemáte dostatečná oprávnění pro přihlášení', 'error')
        }

        loading.value = false
    }
}
</script>

<template>
    <div class="d-flex justify-center align-center w-100 h-100 bg-gradient-blue px-5">
        <div class="w-100 position-relative" style="max-width: 450px">
            <div v-if="source === 'admin'" class="text-center position-absolute" style="right: 20px; bottom: -30px">
                <img src="@/assets/img/strategio.svg" height="100" width="100" alt="Strategio SaaS">
            </div>
            <div class="w-100 pa-10" style="border-radius: .3rem; background-color: rgba(255,255,255,0.97)">
                <v-form validate-on="blur" v-model="valid" ref="form" @submit.prevent="onSubmit">
                    <h2>{{ title }}</h2>
                    <v-text-field
                        autocomplete="email"
                        label="E-mail"
                        v-model="data.email"
                        :rules="schema.email"
                    />
                    <v-text-field
                        autocomplete="current-password"
                        type="password"
                        label="Heslo"
                        v-model="data.password"
                        :rules="schema.password"
                    />
                    <v-btn
                        type="submit"
                        size="large"
                        color="warning"
                        :loading="loading"
                        :disabled="loading"
                    >
                        Přihlásit se
                    </v-btn>
                </v-form>
            </div>
        </div>
    </div>
</template>