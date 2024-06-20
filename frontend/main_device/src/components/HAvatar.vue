<script setup lang="ts">
import {ref} from "vue";

withDefaults(defineProps<{
    url: string,
    size?: number,
    active?: boolean,
    color?: 'red' | 'green' | 'yellow' | 'white' | 'lime' | 'orange' | 'pink' | 'gray' | 'secondary'
}>(), {
    size: 2.5,
    active: false,
    color: 'secondary'
});

const colors = ref({
  'red': 'ring-red-200',
  'green': 'ring-green-200',
  'yellow': 'ring-yellow-200',
  'white': 'ring-white',
  'lime': 'ring-lime-200',
  'orange': 'ring-orange-200',
  'pink': 'ring-pink-200',
  'gray': 'ring-gray-200',
});
</script>

<template>
    <img 
        :style="{ width: size + 'rem', height: size + 'rem' }"
        :class="`rounded-full ring-4 p-1 ${colors[color]} hover:scale-105 transition duration-300 ease-in-out`"
        :src="url" 
        alt="Rounded avatar">
</template>