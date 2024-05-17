<script setup lang="ts">
import HCard from "./HCard.vue";
import { Card } from "@shared/types";

defineProps<{
  size: number,
  card: Card
}>();
</script>

<template>
  <HCard :size="size">
    <h5 class="text-md text-gray-900 dark:text-white text-center">{{ card.title }}</h5>
    <h1 class="text-3xl font-bold tracking-tight text-center">{{ card.year }}</h1>
    <h5 class="text-md text-gray-900 dark:text- text-center">{{ card.interpreter }}</h5>
  </HCard>
</template>