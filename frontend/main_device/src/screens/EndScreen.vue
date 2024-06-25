<script setup lang="ts">
import { HButton, HAvatar } from "../components/";
import {useGameStore} from "@stores/gameStore.ts";
import {IMAGE_URL} from "@shared/urls";
import {ArrowLeftIcon} from "@heroicons/vue/24/solid";

const players = useGameStore().players.sort((a, b) => b.cards.length - a.cards.length);
</script>

<template>
  <div
    class="fixed top-[10%] right-0 w-[50%] h-[80%] flex flex-col items-center justify-center backdrop-blur-lg"
  >
    <ul
      class="relative w-[80%] py-5 overflow-y-scroll max-w-xl mt-10 text-white justify-left divide-y divide-secondary-900 dark:divide-gray-700"
    >
      <li v-for="(player, index) in players" :key="index" class="py-3 sm:py-4">
        <div class="flex items-center justify-center text-white space-x-4">

          <p class="text-2xl font-large truncate">
            # {{ index + 1 }}
          </p>

          <HAvatar
            :url="IMAGE_URL + player.iconURL"
            :color="player.color"
            :size="5"
            :class="`rounded-full text-lg ring-4 mr-10 ${
              player.rank === 1
                ? 'ring-yellow-400 dark:ring-yellow-600'
                : player.rank === 2
                ? 'ring-gray-400 dark:ring-yellow-600'
                : 'ring-orange-700 dark:ring-yellow-600'
            }`"
          ></HAvatar>
          <div class="flex-1 min-w-0">
            <p class="text-2xl font-large truncate">
              {{ player.name }}
            </p>
            <p class="text-sm font-medium truncate">
              with {{ player.cards.length }} collected cards
            </p>
          </div>
        </div>
      </li>
    </ul>
  </div>
  <RouterLink to="/start">
    <HButton class="fixed bottom-5 right-[20%] w-[20%] flex justify-around items-center">
      <ArrowLeftIcon class="w-8 h-8 mr-5" />
      EXIT GAME
    </HButton>
  </RouterLink>
</template>
