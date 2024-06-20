<script setup lang="ts">
import HCard from "./HCard.vue";
import { Card } from "@shared/types";

withDefaults(defineProps<{
  size: number,
  card: Card,
  color: string
}>(), {
  color: 'secondary'
});
</script>

<template>
  <HCard :size="size" :color="color" class="flex flex-col justify-around items-stretch">
    <h5 class="text-sm text-gray-900 dark:text-white text-center">{{ card.title }}</h5>
    <h1 class="text-2xl font-bold tracking-tight text-center">{{ card.year }}</h1>
    <h5 class="text-sm text-gray-900 dark:text- text-center">{{ card.interpreter }}</h5>
  </HCard>
</template>