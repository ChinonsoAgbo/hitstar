<script setup lang="ts">
import { useQRCode } from "@vueuse/integrations/useQRCode";
import { useGameStore } from "../stores/gameStore";

import HButton from "../components/HButton.vue";
import HPlayerNameHorizontal from "../components/HPlayerNameHorizontal.vue";

import HCopy from "../components/HCopy.vue";
import { ref } from "vue";
const gameStore = useGameStore();

const url = `${
  window.location.origin
}/controller-lobby/${gameStore.getSessionID()}`;
const qrcode = useQRCode(url);

interface Player {
  name: string;
  icon: string;
}

const players = ref<Player[]>([
  {
    name: "Harry",
    icon: "/profile-picture-5.jpg",
  },
  {
    name: "Hermione",
    icon: "/profile-picture-3.jpg",
  },
  {
    name: "Ron",
    icon: "/profile-picture-2.jpg",
  },
]);
</script>

<template>
  <div
    class="grid grid-cols-2 gap-4 bg-primary-300 min-h-screen items-center justify-center p-8"
  >
    <div class="flex flex-col items-center space-y-8">
      <h1 class="text-xl font-bold">Join the game using this QR code</h1>
      <img class="rounded-lg w-64 h-64" :src="qrcode" alt="QR Code" />

      <HCopy :url="url"></HCopy>

      <div class="grid grid-cols-2 gap-4 items-stretch justify-center">
        <RouterLink to="/game">
          <!-- A Button for starting a Game -->
          <HButton @click="gameStore.startGame">Start game</HButton>
        </RouterLink>
        <RouterLink to="/start">
          <!-- A button to cancel the game creation  -->
          <HButton>Cancel</HButton>
        </RouterLink>
        <RouterLink to="/design-settings">
          <!-- A button to go to  the Design settings  -->
          <HButton>Design settings</HButton>
        </RouterLink>
        <RouterLink to="/game-settings">
           <!-- A button to go to  the Game settings  -->
          <HButton>Game settings</HButton>
        </RouterLink>
      </div>
    </div>
           <!-- Creates a List of Users that are Connected to the server and are connceted  -->
    <ul class="max-w-md divide-y divide-secondary-900 dark:divide-gray-700">
      <p class="text-lg font-semibold">Players in the waiting lobby:</p>
      <li class="py-3 sm:py-4">
        <div class="w-full divide-y divide-secondary-900 dark:divide-gray-700">
          <div class="flex flex-col space-y-4 rtl:space-x-reverse">
            <HPlayerNameHorizontal v-for="player in players" :player="player">
            </HPlayerNameHorizontal>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
