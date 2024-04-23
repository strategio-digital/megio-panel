<script lang="ts" setup>
import { useComponents } from '@/index'

const { layout } = useComponents()
const { MLayout } = layout
</script>

<template>
    <MLayout>
        <template v-slot:default>
            <div class="pa-7">
                <v-breadcrumbs :items="['Přehled']" class="pa-0" style="font-size: 1.4rem" />
                <p class="mt-3">Vytvořte si vlastní dashboard a zaregistrujte ho ve vue-routeru (./assets/panel.ts).</p>
            </div>
        </template>
    </MLayout>
</template>