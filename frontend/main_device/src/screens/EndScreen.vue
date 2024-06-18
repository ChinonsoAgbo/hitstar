<script setup lang="ts">
import { HButton, HAvatar } from "../components/";
import {useGameStore} from "@stores/gameStore.ts";


const players = useGameStore().players;
</script>

<template>
  <div
    class="fixed top-0 right-0 w-[50%] h-full flex flex-col items-center justify-center space-y-3 backdrop-blur-lg"
  >
    <ul
      class="max-w-md text-white justify-left divide-y divide-secondary-900 dark:divide-gray-700"
    >
      <li v-for="(player, index) in players" :key="index" class="py-3 sm:py-4">
        <div class="flex items-center justify-center text-white space-x-4">
          <HAvatar
            :url="player.icon"
            :class="`rounded-full text-lg ring-4 mr-10 ${
              player.rank === 1
                ? 'ring-yellow-400 dark:ring-yellow-600'
                : player.rank === 2
                ? 'ring-gray-400 dark:ring-yellow-600'
                : 'ring-orange-700 dark:ring-yellow-600'
            }`"
          ></HAvatar>
          <div class="flex-1 min-w-0">
            <p
              class="text-lg font-large truncate"
            >
              # {{ player.rank }}
            </p>
            <p
              class="text-lg font-large truncate"
            >
              {{ player.name }}
            </p>
            <p
              class="text-sm font-medium truncate"
            >
              with {{ player.cards }} collected cards
            </p>
          </div>
        </div>
      </li>
    </ul>
    <p class="text-white">
      {{ players[0].name }} has won with {{ players[0].cards }} Cards,
      congratulations
    </p>
    <RouterLink to="/start">
      <HButton class="lg:m-5 m-10">Exit</HButton>
    </RouterLink>
  </div>
</template>
