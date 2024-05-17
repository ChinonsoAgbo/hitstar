<script setup lang="ts">
import { CurrencyDollarIcon } from '@heroicons/vue/24/outline';

defineProps<{
  amount: number
}>();
</script>

<template>
  <div class="flex justify-center items-center gap-0.5 m-3">
    <CurrencyDollarIcon v-for="_ in amount" class="w-6 h-6 text-yellow-500 bg-yellow-800 rounded-full" />
  </div>
</template>