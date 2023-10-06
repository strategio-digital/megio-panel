<script lang="ts" setup>
import { hasAnyOfResources, hasResource } from '@/api/auth/currentUser'
</script>
<template>
    <v-list density="comfortable">
        <v-list-item
            v-if="hasResource('saas.view.settings.application')"
            :to="{ name: 'saas.view.settings.application' }"
            title="Aplikace"
            value="application"
            prepend-icon="mdi-home-edit-outline"
        />

        <v-divider class="mt-3 mb-3" v-if="hasAnyOfResources(['saas.view.settings.admins', 'saas.view.roles'])" />

        <v-list-item
            v-if="hasResource('saas.view.settings.admins')"
            :to="{ name: 'saas.view.settings.admins' }"
            title="Administrátoři"
            value="admins"
            prepend-icon="mdi-shield-account-outline"
        />

        <v-list-item
            v-if="hasResource('saas.view.settings.resources')"
            :to="{ name: 'saas.view.settings.resources' }"
            title="Role a oprávnění"
            value="roles"
            prepend-icon="mdi-shield-account-variant-outline"
        />

        <v-divider class="mt-3 mb-3" v-if="hasAnyOfResources(['saas.view.settings.storage', 'saas.view.settings.emails'])" />

        <v-list-item
            v-if="hasResource('saas.view.settings.storage')"
            :to="{ name: 'saas.view.settings.storage' }"
            title="Úložiště souborů"
            value="storage"
            prepend-icon="mdi-server"
        />

        <v-list-item
            v-if="hasResource('saas.view.settings.emails')"
            :to="{ name: 'saas.view.settings.emails' }"
            title="E-maily"
            value="emails"
            prepend-icon="mdi-email-sync-outline"
        />
    </v-list>
</template>