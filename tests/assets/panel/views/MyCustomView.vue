<script lang="ts" setup>
import { useVuetify } from 'megio-panel'

const { VBtn } = useVuetify()
</script>

<template>
    <div class="d-flex align-center justify-center h-100">
        <div class="text-center">
            <h1>Test vlastního view</h1>
            <v-btn variant="tonal" class="mt-3">Test btn</v-btn>
        </div>
    </div>
</template>