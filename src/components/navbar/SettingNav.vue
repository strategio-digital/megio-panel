<script lang="ts" setup>
import { mdiShieldAccountOutline, mdiShieldAccountVariantOutline } from '@mdi/js'
import { megio } from 'megio-api'
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
    </v-list>
</template>