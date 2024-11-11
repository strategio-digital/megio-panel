<script lang="ts" setup>
import { megio } from 'megio-api'
import { mdiFolderTableOutline, mdiShieldAccountOutline, mdiShieldAccountVariantOutline } from '@mdi/js'
</script>

<template>
    <v-list density="comfortable">
        <v-list-item
            v-if="megio.auth.user.hasResource('megio.view.settings.admins')"
            :to="{ name: 'megio.view.settings.admins' }"
            title="Administrátoři"
            value="admins"
            :prepend-icon="mdiShieldAccountOutline"
        />
        <v-list-item
            v-if="megio.auth.user.hasResource('megio.view.settings.resources')"
            :to="{ name: 'megio.view.settings.resources' }"
            title="Role a oprávnění"
            value="roles"
            :prepend-icon="mdiShieldAccountVariantOutline"
        />
        <v-list-item
            v-if="megio.auth.user.hasResource('megio.view.settings.queue')"
            :to="{ name: 'megio.view.settings.queue' }"
            title="Fronty a workery"
            value="queue"
            :prepend-icon="mdiFolderTableOutline"

        />
    </v-list>
</template>