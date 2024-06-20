<script setup lang="ts">
import HAvatar from "./HAvatar.vue";
import { Player } from "@shared/types";
import { IMAGE_URL } from "@shared/urls";
import {onMounted} from "vue";

defineProps<{
  player : Player
}>();

</script>

<template>
    <div class="flex items-center text-white my-5">

        <div class="relative">
            <HAvatar :url="IMAGE_URL + player.iconURL" :color="player.color"> </HAvatar>
            <span
                class="absolute top-0 right-0 w-3.5 h-3.5 bg-green-400 border-2 \
                       border-white dark:border-gray-800 rounded-full">
            </span>
        </div>

        <span class="ml-5 text-lg font-medium text-white truncate">
            {{ player.name }}
        </span>

    </div>
</template>
  
