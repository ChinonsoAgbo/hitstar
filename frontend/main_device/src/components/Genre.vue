<script setup lang="ts">
const genreProps =
    defineProps<{
      genre: {
        id: string,
        name: string,
      }
    }>()
</script>
<template>
  <!-- List of Checkbox for Genres -->
  <li>
    <input type="checkbox" :id="genreProps.genre.id" value="" class="hidden peer">
    <label :for="genreProps.genre.id"
           class="inline-flex items-center justify-between w-full p-5 text-gray-500 \
                  bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 \
                  dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 \
                  dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 \
                  dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
      <div class="block">
        <div class="w-full text-lg font-semibold">{{ genreProps.genre.name }}</div>
      </div>
    </label>
  </li>
</template>