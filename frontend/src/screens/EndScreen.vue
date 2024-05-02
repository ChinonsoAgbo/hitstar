<script setup lang="ts">
import HButton from "../components/HButton.vue";
import HAvatar from "../components/HAvatar.vue";
import { ref } from "vue";

interface Player {
  name: string;
  icon: string;
  cards: number;
  rank: number;
}

const players = ref<Player[]>([
  {
    name: "Harry",
    icon: "/profile-picture-5.jpg",
    cards: 10,
    rank: 1,
  },
  {
    name: "Hermione",
    icon: "/profile-picture-3.jpg",
    cards: 8,
    rank: 2,
  },
  {
    name: "Ron",
    icon: "/profile-picture-2.jpg",
    cards: 7,
    rank: 3,
  },
]);
</script>

<template>
  <div
    class="flex flex-col items-center justify-center space-y-3 bg-primary-300 min-h-screen"
  >
    <ul
      class="max-w-md justify-left divide-y divide-secondary-900 dark:divide-gray-700"
    >
      <li v-for="(player, index) in players" :key="index" class="py-3 sm:py-4">
        <div class="flex items-center space-x-4 rtl:space-x-reverse">
          <HAvatar
            :url="player.icon"
            :class="`rounded-full text-lg ring-4 ${
              player.rank === 1
                ? 'ring-yellow-400 dark:ring-yellow-600'
                : player.rank === 2
                ? 'ring-gray-400 dark:ring-yellow-600'
                : 'ring-orange-700 dark:ring-yellow-600'
            }`"
          ></HAvatar>
          <div class="flex-1 min-w-0">
            <p
              class="text-lg font-large text-gray-900 truncate dark:text-white"
            >
              # {{ player.rank }}
            </p>
            <p
              class="text-lg font-large text-gray-900 truncate dark:text-white"
            >
              {{ player.name }}
            </p>
            <p
              class="text-sm font-medium text-gray-900 truncate dark:text-white"
            >
              with {{ player.cards }} collected cards
            </p>
          </div>
        </div>
      </li>
    </ul>
    <p>
      {{ players[0].name }} has won with {{ players[0].cards }} Cards,
      congratulations
    </p>
    <RouterLink to="/start">
      <HButton class="lg:m-5 m-10">Exit</HButton>
    </RouterLink>
  </div>
</template>
