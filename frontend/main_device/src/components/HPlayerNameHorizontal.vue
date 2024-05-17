<script setup lang="ts">
import HAvatar from "./HAvatar.vue";
import { Player } from "@shared/types";

defineProps<{
  player : Player
}>();
</script>

<template>
    <div class="flex items-center">

        <div class="relative">
            <HAvatar :url="player.iconURL"> </HAvatar>
            <span
                class="absolute top-0 right-0 w-3.5 h-3.5 bg-green-400 border-2 \
                       border-white dark:border-gray-800 rounded-full">
            </span>
        </div>

        <span class="ml-3 text-sm font-medium text-gray-900 truncate dark:text-white">
            {{ player.name }}
        </span>

    </div>
</template>
  
