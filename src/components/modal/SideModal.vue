<script lang="ts" setup>
import { onMounted, onUnmounted, watch } from 'vue'

const props = defineProps<{
    opened: boolean
}>()

const emit = defineEmits<{
    (e: 'close'): void
}>()

function handleClose() {
    emit('close')
}

function keyupEscape(ev: KeyboardEvent) {
    if (ev.key === 'Escape' && props.opened) {
        emit('close')
    }
}

onMounted(() => document.addEventListener('keyup', keyupEscape))
onUnmounted(() => document.removeEventListener('keyup', keyupEscape))

watch(() => props.opened, () => {
    const html = document.querySelector('html') as HTMLHtmlElement
    if (props.opened) {
        html.style.overflow = 'hidden'
        html.style.paddingRight = '15px'
    } else {
        html.style.removeProperty('overflow')
        html.style.removeProperty('padding-right')
    }
})
</script>

<template>
    <div
        @keyup.esc="handleClose"
        @click.self="handleClose"
        class="position-fixed h-100 w-100 side-modal"
        :class="{ 'opened': opened }"
    >
        <div class="position-fixed h-100 bg-white side-modal-container">
            <div class="position-absolute bg-white pa-3 rounded-s-xl side-modal-close">
                <v-btn
                    @click="handleClose"
                    icon="mdi-close"
                    color="grey-darken-1"
                    size="x-small"
                    style="margin-left: 3px"
                />
            </div>
            <div class="position-relative h-100 w-100">
                <slot name="default" />
            </div>
        </div>
    </div>
</template>