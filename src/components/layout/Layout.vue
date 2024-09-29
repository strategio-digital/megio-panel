<script lang="ts" setup>
import { inject, useSlots } from 'vue'
import { useRoute } from 'vue-router'
import { megio } from 'megio-api'
import { mdiAccountArrowLeft, mdiWeatherNight, mdiWeatherSunny } from '@mdi/js'
import { useTheme } from '@/components/theme/useTheme'
import { useLogout } from '@/components/user/useLogout'
import type INavbarSettings from '@/components/navbar/types/INavbarSettings'
import type IVersions from '@/components/version/IVersions'

export type Props = { loading?: boolean }
const props = defineProps<Props>()

const navbar = inject<INavbarSettings>('navbar')
const versions = inject<IVersions>('versions')

const { theme, switchTheme } = useTheme()
const { logout } = useLogout()

const slots = useSlots()
const route = useRoute()
</script>

<template>
    <v-app :theme="theme">
        <v-navigation-drawer v-if="navbar" :permanent="true" :rail="true" rail-width="86">
            <router-link
                :to="{ name: navbar.brand.routeName }"
                class="ps-2 mb-4 mt-3 d-flex text-no-wrap align-center text-decoration-none"
            >
                <div
                    class="rounded-circle"
                    :class="{'bg-grey-lighten-2': theme === 'light'}"
                    :style="{'padding': (theme === 'light' ? '2px' : '0px')}"
                >
                    <img
                        :src="navbar.brand.logo"
                        :width="theme === 'light' ? 34 : 38"
                        :height="theme === 'light' ? 34 : 38"
                        :alt="navbar.brand.title"
                        class="d-block"
                    >
                </div>
                <h4 class="ms-6 my-0 py-0 font-weight-bold" :class="`color-blue-${theme}`">Megio</h4>
            </router-link>

            <v-list density="comfortable">
                <template v-for="nav in navbar.items" :key="nav.route.name">
                    <v-tooltip
                        v-if="megio.auth.user.hasResource(nav.route.name?.toString() || '@undefined')"
                        location="end"
                        :text="nav.title"
                        offset="-5"
                    >
                        <template v-slot:activator="{ props }">
                            <v-list-item
                                v-bind="props"
                                :active="route.path.startsWith(nav.activePrefix)"
                                :to="nav.route"
                                :prepend-icon="nav.icon"
                                :value="nav.route.name"
                                :title="nav.title"
                            />
                        </template>
                    </v-tooltip>
                </template>
            </v-list>

            <template v-slot:append>
                <v-list density="comfortable">
                    <!--v-tooltip location="end" :text="theme === 'light' ? 'Tmavý režim' : 'Světlý režim'" offset="-5">
                        <template v-slot:activator="{ props }">
                            <v-list-item
                                v-bind="props"
                                @click="switchTheme"
                                :prepend-icon="theme === 'light' ? mdiWeatherNight : mdiWeatherSunny"
                                :title="theme === 'light' ? 'Tmavý režim' : 'Světlý režim'"
                                value="theme"
                            />
                        </template>
                    </v-tooltip-->

                    <v-tooltip location="end" text="Odhlásit se" offset="-5">
                        <template v-slot:activator="{ props }">
                            <v-list-item
                                v-bind="props"
                                @click="logout"
                                :prepend-icon="mdiAccountArrowLeft"
                                title="Odhlásit se"
                                value="logout"
                            />
                        </template>
                    </v-tooltip>
                </v-list>

                <div v-if="versions" style="font-size: .6rem; color: #aaaaaa; z-index: 10000000; text-align: center">
                    <div>
                        <a
                            :href="`https://github.com/strategio-digital/megio-core/tree/${versions.commit_reference}`"
                            target="_blank"
                            style="color: #aaaaaa"
                        >
                            {{ versions.composer }}
                        </a>
                    </div>
                    <div>{{ versions.yarn }}</div>
                </div>
            </template>
        </v-navigation-drawer>

        <template v-if="slots.navigation">
            <v-navigation-drawer :permanent="true">
                <slot name="navigation"></slot>
            </v-navigation-drawer>
        </template>

        <v-main :scrollable="true">
            <div
                :class="[theme, props.loading || 'invisible']"
                style="z-index: 10; top: 0; bottom: 0; left: 0; right: 0; height: 100vh"
                class="position-absolute w-100 d-flex bg-overlay"
            >
                <v-progress-circular indeterminate :size="30" :width="3" class="mt-8 ms-7" />
            </div>
            <slot><h1>...</h1></slot>
        </v-main>
    </v-app>
</template>