<script setup lang="ts">
import HButton from "./HButton.vue";
defineProps<{
  url: string;
}>();
</script>

<template>
    <div class="grid grid-cols-8 gap-2 w-full max-w-[23rem] items-center">
      <label for="url" class="sr-only">URL</label>
      <div class="col-span-6 flex items-center"> <!-- Hinzufügen von 'flex items-center' -->
        <input
          id="qr-code-url"
          type="text"
          class="bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-primary-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          :value="url"
          disabled
          readonly
        />
      </div>
      <HButton
        :data-copy-to-clipboard-target="url"
        class="col-span-2 text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 items-center inline-flex justify-center"
      >
        <span id="default-message">Copy</span>
        <span id="success-message" class="hidden items-center">
          <svg
            class="w-3 h-3 text-white me-1.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 16 12"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 5.917 5.724 10.5 15 1.5"
            />
          </svg>
          Copied!
        </span>
      </HButton>
    </div>
  </template>
  