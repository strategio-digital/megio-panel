<script lang="ts" setup>
import { mdiShieldAccountOutline, mdiShieldAccountVariantOutline } from '@mdi/js'
import { hasResource } from '@/api/auth/currentUser'
</script>
<template>
    <v-list density="comfortable">
        <v-list-item
            v-if="hasResource('saas.view.settings.admins')"
            :to="{ name: 'saas.view.settings.admins' }"
            title="Administrátoři"
            value="admins"
            :prepend-icon="mdiShieldAccountOutline"
        />

        <v-list-item
            v-if="hasResource('saas.view.settings.resources')"
            :to="{ name: 'saas.view.settings.resources' }"
            title="Role a oprávnění"
            value="roles"
            :prepend-icon="mdiShieldAccountVariantOutline"
        />
    </v-list>
</template>