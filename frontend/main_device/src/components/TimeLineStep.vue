<script setup lang="ts">
import { EllipsisHorizontalCircleIcon, HandThumbUpIcon } from "@heroicons/vue/24/solid";

withDefaults(defineProps<{
  subtitle: string,
  done: boolean
}>(), {
  done: false
});
</script>

<template>
  <li class="mb-5 ms-4">
   <span class="absolute flex items-center justify-center w-8 h-8 bg-primary-800 rounded-full -start-4 ring-4 ring-orange-400">
     <HandThumbUpIcon v-if="done" class="w-8 h-8 text-white" />
     <EllipsisHorizontalCircleIcon v-else class="w-8 h-8 text-white" />
    </span>
    <h3 class="flex items-center mb-1 ml-5 text-2xl font-semibold text-gray-300">{{ subtitle }}</h3>
    <time class="block mb-2 ml-5 text-lg font-normal leading-none text-white"><slot /></time>
    <p class="inline-flex items-center ml-5 py-2">
      <slot name="button" />
    </p>
  </li>
</template>

<style scoped>

</style>