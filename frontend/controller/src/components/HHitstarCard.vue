<script setup lang="ts">
import HCard from "./HCard.vue";
import { IMAGE_URL } from "@shared/urls";

defineProps<{
  size: number
}>();
</script>

<template>
  <HCard :size="size" :padding="false" class="">
    <img class="rounded-xl" :style="`height: ${size-0.5}em`" :src="`${IMAGE_URL}hitstar.jpg`" alt="" />
  </HCard>
</template>