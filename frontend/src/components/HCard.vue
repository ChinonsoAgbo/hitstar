<script setup lang="ts">
withDefaults(defineProps<{
    size: number,
    padding?: boolean
}>(), {
    padding: true
});
</script>

<template>
    <div
        :style="{ width: size + 'em', height: size + 'em', padding: padding ? '1.25rem' : '0rem' }"
        class="flex-col bg-secondary-500 border-primary-700 border-4 rounded-2xl">
        <slot />
    </div>
</template>