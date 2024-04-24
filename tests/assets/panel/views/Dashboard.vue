<script lang="ts" setup>
import { useComponents, useVuetify } from 'megio-panel'

const { VBtn } = useVuetify()
const { MLayout } = useComponents()
</script>

<template>
    <MLayout >
        <div class="pa-7">
            <p class="my-3">Toto je můj vlastní dashboard.</p>
            <v-btn variant="tonal" @click="() => console.log('click')">Test</v-btn>
        </div>
    </MLayout>
</template>