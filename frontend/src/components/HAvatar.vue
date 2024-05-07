<script setup lang="ts">
withDefaults(defineProps<{
    url: string,
    size?: number,
    active?: boolean
}>(), {
    size: 2.5,
    active: false
});
</script>

<template>
    <img 
        :style="{ width: size + 'rem', height: size + 'rem' }" 
        class="rounded-full ring-4 p-1" 
        :class="[ active ? 'ring-secondary-500' : 'ring-gray-400 dark:ring-gray-500' ]" 
        :src="url" 
        alt="Rounded avatar">
</template>