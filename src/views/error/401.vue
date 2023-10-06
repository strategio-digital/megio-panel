<script lang="ts" setup>
import { useLogout } from '@/components/user/useLogout'

const { logout } = useLogout()
</script>

<template>
    <div class="d-flex w-100 h-100 justify-center align-center bg-gradient-blue">
        <div style="min-width: 280px" class="text-white text-center">
            <h1 style="font-size: 5rem">401</h1>
            <h2 class="mb-8">Nedostatečné oprávnění</h2>
            <router-link :to="{name: 'saas.view.dashboard'}" class="text-white me-3">Zpět na nástěnku</router-link>

            <a href="#" @click="logout" class="text-white">Odhlásit se</a>
        </div>
    </div>
</template>