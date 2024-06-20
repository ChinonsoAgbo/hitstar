<script setup lang="ts">
defineProps<{
  type: string,
  id: string,
  placeholder: string
}>();

const model = defineModel()
</script>

<template>
  <input
      :type="type"
      :id="id"
      v-model="model"
      class="text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 \
            border-gray-600 placeholder-gray-200 text-white focus:ring-blue-500 \
            focus:border-blue-500 shadow-sm-light bg-black"
      :placeholder="placeholder"
      required
  />
</template>

<style scoped>

</style>