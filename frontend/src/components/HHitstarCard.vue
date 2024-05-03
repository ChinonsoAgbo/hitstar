<script setup lang="ts">
import HCard from "./HCard.vue";

defineProps<{
  size: number
}>();
</script>

<template>
  <HCard :size="size" :padding="false" class="">
    <img class="rounded-xl" :style="`height: ${size-0.5}em`" src="/hitstar.jpg" alt="" />
  </HCard>
</template>