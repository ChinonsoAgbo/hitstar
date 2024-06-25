<script setup lang="ts">
defineProps<{
  url: string;
}>();
</script>

<template>
  <div class="gap-2 w-full max-w-[23rem] items-center">
    <label :for="url" class="sr-only">URL</label>
    <div class="col-span-6 flex items-center">
      <!-- Hinzufügen von 'flex items-center' -->
      <input
        id="url"
        type="text"
        class="bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-primary-500 \
              focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 \
              dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
        :value="url"
        disabled
        readonly
      />
    </div>
  </div>
</template>
