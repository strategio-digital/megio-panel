<script setup lang="ts">
import { VSonner } from 'vuetify-sonner'
</script>

<template>
    <VSonner position="bottom-right" :visible-toasts="5" />
    <router-view />
</template>