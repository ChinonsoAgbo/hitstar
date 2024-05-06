<script setup lang="ts">
import { ChevronLeftIcon } from "@heroicons/vue/24/outline";

import { XMarkIcon } from "@heroicons/vue/24/outline";

import {
  ChevronRightIcon,
  PauseIcon,
  PlayIcon,
} from "@heroicons/vue/24/outline";

import { ChevronUpIcon } from "@heroicons/vue/24/outline";
import HAvatar from "../components/HAvatar.vue";

import { ref } from "vue";

import mqtt from "mqtt";
import { GameStateNew, drawConfirmMsg, turnMsg } from "../types";
const client = mqtt.connect("ws://localhost:9001");

const isMusicPlaying = ref(false);
const changePlaySate = () => {
  isMusicPlaying.value = !isMusicPlaying.value;

};
const musicState = ref(true);
const changeMusicSate = () => {
  musicState.value = !musicState.value;
 

};







const musicPlayDuration = 5000;





</script>

<template>
  <div class="container mx-auto mt-7 flex justify-center items-center">
    <!-- Controller card -->
    <div class="w-full max-w-sm rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <!-- Profile and Settings -->
      <div class="grid grid-cols-2 mx-4 mt-2">
        <div class="flex justify-start m-3">
          <!-- Link to Game instructions -->
          <HAvatar url="/profile-picture-5.jpg"></HAvatar>
          <span class="text-sm m-2 text-gray-500 dark:text-gray-400">
            Chinonso A
          </span>
        </div>

        <div class="flex justify-end">
          <!--  settings/Dropdown button -->

          <!-- Spiel GameInstruction -->
          <RouterLink to="/game">
            <img class="w-10 h-10 rounded-full" src="/support.png" alt="" />
          </RouterLink>
        </div>

        <!-- Link to Game instructions -->
      </div>

      <div class="flex flex-col items-center w-full py-20">
        <!-- Navigation button-->
        <div v-if="isMusicPlaying">
          <button type="button"
            class="bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 rounded-full px-5 py-5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
            <ChevronLeftIcon class="w-10 h-10 text-slate-200">
            </ChevronLeftIcon>
          </button>

          <button @click="changeMusicSate" type="button"
            class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 rounded-full px-10 py-2.5 mx-3 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
            <PauseIcon v-if="musicState" class="w-12 h-12 cursor-pointer" />

            <PlayIcon v-else class="w-12 h-12 cursor-pointer" />
          </button>

          <button type="button"
            class="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 rounded-full px-5 py-5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
            <ChevronRightIcon class="w-10 h-10 text-slate-200">
            </ChevronRightIcon>
          </button>
        </div>
        <div v-else class="flex mt-4 md:mt-12 sm:mt-12">
          <button type="button"
            class="bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 rounded-full px-5 py-5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
            <ChevronLeftIcon class="w-10 h-10 text-slate-200">
            </ChevronLeftIcon>
          </button>

          <button
            @click='client.publish(drawConfirmMsg.topic, JSON.stringify(drawConfirmMsg.message))'
            
            type="button"
            class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 rounded-full px-10 py-2.5 mx-3 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            <ChevronUpIcon class="w-10 h-10 text-slate-200"> </ChevronUpIcon>
          </button>
          <button type="button"
            class="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 rounded-full px-5 py-5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
            <ChevronRightIcon class="w-10 h-10 text-slate-200">
            </ChevronRightIcon>
          </button>
        </div>
        <!-- Rejection button-->
        <button
        @click= 'client.publish(doubtMsg.topic, JSON.stringify(turnMsg(GameStateNew.DOUBT)))'
          type="button"
          class="bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full px-20 py-4 pt- dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          <XMarkIcon class="w-10 h-10 text-slate-200"> </XMarkIcon>
          <!-- <img class="w-10 h-10 rounded-full" src="../assets/icons/unlike.png" alt=""> -->
        </button>
      </div>
    </div>
  </div>
</template>
