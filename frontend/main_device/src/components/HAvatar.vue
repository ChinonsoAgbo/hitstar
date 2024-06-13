<script setup lang="ts">
withDefaults(defineProps<{
    url: string,
    size?: number,
    active?: boolean,
    color?: string
}>(), {
    size: 2.5,
    active: false,
    color: 'secondary'
});
</script>

<template>
    <img 
        :style="{ width: size + 'rem', height: size + 'rem' }"
        :class="`rounded-full ring-4 p-1 ring-${color}-200`"
        :src="url" 
        alt="Rounded avatar">
</template>