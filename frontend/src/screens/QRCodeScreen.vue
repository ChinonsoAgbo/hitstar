<script setup lang="ts">
import { useQRCode } from "@vueuse/integrations/useQRCode";
import HAvatar from "../components/HAvatar.vue";
import HButton from "../components/HButton.vue";
const url = window.location.href;
const qrcode = useQRCode(url);
</script>

<template>
  <div class="grid grid-cols-2 gap-4 bg-primary-300 min-h-screen items-center justify-center p-8">
    <div class="flex flex-col items-center space-y-8">
      <h1 class="text-xl font-bold">Join the game using this QR code</h1>
      <img class="rounded-lg w-64 h-64" :src="qrcode" alt="QR Code" />

      <div class="grid grid-cols-8 gap-2 w-full max-w-[23rem] items-center">
        <label for="url" class="sr-only">URL</label>
        <input id="npm-install" type="text"
          class="col-span-6 bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-primary-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          :value="url" disabled readonly />
        <HButton :data-copy-to-clipboard-target="url"
          class="col-span-2 text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 items-center inline-flex justify-center">
          <span id="default-message">Copy</span>
          <span id="success-message" class="hidden items-center">
            <svg class="w-3 h-3 text-white me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 16 12">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M1 5.917 5.724 10.5 15 1.5" />
            </svg>
            Copied!
          </span>
        </HButton>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <RouterLink to="/game">
          <HButton class="lg:mx-5 mx-10 lg:py-3 py-2">Start game</HButton>
        </RouterLink>
        <RouterLink to="/start">
          <HButton class="lg:mx-5 mx-10 lg:py-3 py-2">Cancel</HButton>
        </RouterLink>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <RouterLink to="/design-settings">
          <HButton class="lg:mx-5 mx-10">
            <div class="font-medium text-center inline-flex items-center">
              <div>
                <svg class="w-6 h-6 text-white dark:text-white mr-2" aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2" />
                </svg>
              </div>
              <div>Design settings</div>
            </div>
          </HButton>
        </RouterLink>
        
        <RouterLink to="/game-settings">
          <HButton class="lg:mx-5 mx-10">
            <div class="font-medium text-center inline-flex items-center">
              <div>
                <svg class="w-6 h-6 text-white dark:text-white mr-2" aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2" />
                </svg>
              </div>
              <div>Game settings</div>
            </div>
          </HButton>
        </RouterLink>
      </div>

    </div>

    <ul class="max-w-md divide-y divide-secondary-900 dark:divide-gray-700">
      <p class="text-lg font-semibold">Players in the waiting lobby:</p>
      <li class="py-4">
        <div class="flex items-center space-x-4 rtl:space-x-reverse">
          <HAvatar url="/profile-picture-2.jpg"> </HAvatar>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
              Hit Star
            </p>
          </div>
        </div>
      </li>

      <li class="py-3 sm:py-4">
        <div class="flex items-center space-x-4 rtl:space-x-reverse">
          <HAvatar url="/profile-picture-5.jpg"> </HAvatar>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
              Chinonso Agbo
            </p>
          </div>
        </div>
      </li>
      <li class="py-3 sm:py-4">
        <div class="flex items-center space-x-4 rtl:space-x-reverse">
          <HAvatar url="/profile-picture-3.jpg"> </HAvatar>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
              Cornelius Hartmann
            </p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
