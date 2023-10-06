<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from '@/components/toast/useToast'
import { mdiClose, mdiPlus } from '@mdi/js'
import api from '@/api'
import Layout from '@/components/layout/Layout.vue'
import SettingNav from '@/components/navbar/SettingNav.vue'
import RemoveRoleModal from '@/components/resource/RemoveRoleModal.vue'
import CreateRoleModal from '@/components/resource/CreateRoleModal.vue'
import { type IResource } from '@/api/resources/types/IResource'
import { type IRole } from '@/api/resources/types/IRole'
import { type IResourceDiff } from '@/api/resources/types/IResourceDiff'
import { type IGroupedResourcesWithRoles } from '@/api/resources/types/IGroupedResourcesWithRoles'
import { type IResp as IRespShow } from '@/api/resources/show'
import { type IResp as IRespUpdate } from '@/api/resources/update'

const router = useRouter()
const toast = useToast()

const loading = ref(true)
const resources = ref<IResource[]>([])
const roles = ref<IRole[]>([])
const groupedResourcesWithRoles = ref<IGroupedResourcesWithRoles[]>([])
const resourceDiff = ref<IResourceDiff>()

const currentRemovingRole = ref<IRole>()
const removeRoleModalOpen = ref<boolean>(false)
const createRoleModalOpen = ref<boolean>(false)

const routes = computed(() => {
    return router.getRoutes()
    .filter(route => route.meta.auth !== false && route.meta.inResources !== false)
    .map(route => route.name as string)
})

const badgeDiff = computed((): number => {
    return ((resourceDiff.value?.to_create.length || 0) + (resourceDiff.value?.to_remove.length || 0))
})

function getRouteHint(routeName: string) {
    const route = router.getRoutes().filter(route => route.name === routeName).shift()

    if (route) {
        return '[GET] ' + router.options.history.base + route.path
    }

    return null
}

function toggleRemoveRoleModal(role: IRole | null = null) {
    if (role) {
        currentRemovingRole.value = role
        removeRoleModalOpen.value = true
    } else {
        removeRoleModalOpen.value = false
    }
}

function removeRoleModalSuccess(role: IRole) {
    roles.value = roles.value.filter(r => r.id !== role.id)
    groupedResourcesWithRoles.value = groupedResourcesWithRoles.value.map(group => {
            const rr = group.resources.map(res => {
                return { ...res, roles: res.roles.filter(rol => rol.id !== role.id) }
            })
            return { ...group, resources: rr }
        }
    )
    toggleRemoveRoleModal(null)
}

function createRoleModalSuccess(role: IRole) {
    createRoleModalOpen.value = false
    roles.value.push(role)

    groupedResourcesWithRoles.value = groupedResourcesWithRoles.value.map(group => {
        const rr = group.resources.map(res => {
            const rls = res.roles
            rls.push(role)
            return { ...res, roles: rls }
        })
        return { ...group, resources: rr }
    })
}

function unwrapResponse(resp: IRespShow | IRespUpdate) {
    groupedResourcesWithRoles.value = resp.data.grouped_resources_with_roles
    resourceDiff.value = resp.data.resources_diff
    resources.value = resp.data.resources
    roles.value = resp.data.roles
}

async function update() {
    loading.value = true
    const resp = await api.resources.update(routes.value)
    if (resp.success) {
        unwrapResponse(resp)
        toast.add('Aktualizace resources proběhla úspěšně', 'success')
    }
    loading.value = false
}

async function updateRole(enabled: boolean, role: IRole, resource: IResource) {
    const resp = await api.resources.updateRole(role.id, resource.id, enabled)

    if (resp.success) {
        toast.add(resp.data.message, 'success')
    }
}

onMounted(async () => {
    const resp = await api.resources.show(routes.value)
    if (resp.success) unwrapResponse(resp)
    loading.value = false
})
</script>

<template>
    <Layout :loading="loading">
        <template v-slot:default>
            <RemoveRoleModal
                v-if="currentRemovingRole"
                :open="removeRoleModalOpen"
                :role="currentRemovingRole"
                @onCancel="toggleRemoveRoleModal(null)"
                @onAccept="removeRoleModalSuccess"
            />

            <CreateRoleModal
                :open="createRoleModalOpen"
                @onCancel="createRoleModalOpen = false"
                @onSuccess="createRoleModalSuccess"
            />

            <div class="pa-7">
                <div class="d-flex justify-space-between align-center">
                    <v-breadcrumbs :items="['Role a oprávnění']" class="pa-0" style="font-size: 1.4rem" />

                    <div class="d-flex ms-3">
                        <v-btn @click="createRoleModalOpen = true" variant="tonal" :prepend-icon="mdiPlus" class="ms-3">
                            Nová role
                        </v-btn>
                        <v-btn @click="update" variant="tonal" color="red" class="ms-3">
                            <v-badge v-if="badgeDiff" :content="badgeDiff" color="red" offset-y="-22" offset-x="12" />
                            <span>Aktualizovat</span>
                        </v-btn>
                    </div>
                </div>

                <v-alert color="red" variant="tonal" border="start" icon="$warning" class="mt-5" v-if="badgeDiff !== 0">
                    <div>
                        Upravili jste položky routeru. Je tedy potřeba aktualizovat vaše
                        resources. To provedete kliknutím na tlačítko "aktualizovat".
                    </div>

                    <div class="mt-3 text-green" v-if="resourceDiff?.to_create.length">
                        <span class="font-weight-bold">[+{{ resourceDiff?.to_create.length }}]: </span>
                        {{ resourceDiff?.to_create.join(' | ') }}
                    </div>

                    <div class="mt-3 text-red" v-if="resourceDiff?.to_remove.length">
                        <span class="font-weight-bold">[-{{ resourceDiff?.to_remove.length }}]: </span>
                        {{ resourceDiff?.to_remove.join(' | ') }}
                    </div>
                </v-alert>

                <div class="mt-5">
                    <v-chip class="me-3">admin</v-chip>
                    <v-chip
                        v-for="role in roles"
                        :key="role.id"
                        :append-icon="mdiClose"
                        class="me-3"
                        @click="toggleRemoveRoleModal(role)"
                    >
                        {{ role.name }}
                    </v-chip>
                </div>

                <div class="py-5 mt-5" v-for="group in groupedResourcesWithRoles" :key="group.groupName">
                    <h2 class="mt-0 mb-0">{{ group.groupName }}</h2>
                    <v-table density="default" :hover="true">
                        <thead>
                        <tr class="text-no-wrap">
                            <th></th>
                            <th>admin</th>
                            <th v-for="role in roles" :key="role.id">{{ role.name }}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr class="text-body-2" v-for="resource in group.resources" :key="resource.id">
                            <td style="width: 100%">
                                <div>{{ resource.name }}</div>
                                <div v-if="resource.hint" style="font-size: .8rem" class="text-grey-darken-1">
                                    {{ resource.hint }}
                                </div>
                                <div
                                    v-else-if="resource.type === 'router.view'"
                                    style="font-size: .8rem"
                                    class="text-grey-darken-1"
                                >
                                    {{ getRouteHint(resource.name) }}
                                </div>
                            </td>
                            <td class="text-center">
                                <v-checkbox
                                    class="d-flex justify-center"
                                    color="primary"
                                    :model-value="true"
                                    :disabled="true"
                                />
                            </td>
                            <td v-for="role in resource.roles" :key="`${role.id + resource.id}`">
                                <v-checkbox
                                    class="d-flex justify-center"
                                    color="primary"
                                    :model-value="role.enabled"
                                    @change="(e: InputEvent) => updateRole((e.target as HTMLInputElement).checked, role, resource)"
                                />
                            </td>
                        </tr>
                        </tbody>
                    </v-table>
                </div>
            </div>
        </template>

        <template v-slot:navigation>
            <SettingNav />
        </template>
    </Layout>
</template>