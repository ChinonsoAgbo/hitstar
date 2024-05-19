<script setup lang="ts">
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PauseIcon,
  PlayIcon,
  XMarkIcon,
  ChevronUpIcon,
} from "@heroicons/vue/24/outline";
import HAvatar from "@components/HAvatar.vue";
import { GameState } from "@shared/types";
import { useControllerStore } from "@stores/controllerStore";
import { useGameCycleStore } from "@shared/stores/gameCycleStore.ts";
import { IMAGE_URL } from "@shared/urls";

const controllerStore = useControllerStore();
const gameCycle = useGameCycleStore();
</script>

<template>
  <div class="container mx-auto mt-7 flex justify-center items-center">
    <!-- Controller card -->
    <div
      class="w-full max-w-sm rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <!-- Profile and Settings -->
      <div class="grid grid-cols-2 mx-4 mt-2">
        <div class="flex justify-start m-3">
          <!-- Link to Game instructions -->
          <HAvatar :url="IMAGE_URL + controllerStore.getIconUrl()"></HAvatar>
          <span class="text-sm m-2 text-gray-500 dark:text-gray-400">
            {{ controllerStore.getPlayerName() }}
          </span>
        </div>

        <div class="flex justify-end">
          <!--  settings/Dropdown button -->

          <!-- Spiel GameInstruction -->
          <!--          <RouterLink to="/game">-->
          <img
            class="w-10 h-10 rounded-full"
            :src="IMAGE_URL + 'support.png'"
            alt=""
          />
          <!--          </RouterLink>-->
        </div>

        <!-- Link to Game instructions -->
      </div>

      <div class="flex flex-col items-center w-full py-20">
        <!-- Navigation button-->
        <div
          v-if="
            gameCycle.activeGameState === GameState.LISTEN &&
            controllerStore.itsTurn
          "
        >
          <button type="button" class="bg-gray-500 rounded-full px-5 py-5 mb-2">
            <ChevronLeftIcon class="w-10 h-10 text-slate-200">
            </ChevronLeftIcon>
          </button>

          <button
            @click="controllerStore.changeMusicState(), console.log('commit')"
            type="button"
            class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 rounded-full px-10 py-2.5 mx-3 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            <PauseIcon
              v-if="!controllerStore.isMusicPlaying"
              class="w-12 h-12 cursor-pointer"
            />

            <PlayIcon v-else class="w-12 h-12 cursor-pointer" />
          </button>

          <button type="button" class="bg-gray-500 rounded-full px-5 py-5 mb-2">
            <ChevronRightIcon class="w-10 h-10 text-slate-200">
            </ChevronRightIcon>
          </button>
        </div>
        <div v-else class="flex mt-4 md:mt-12 sm:mt-12">
          <!--turnRight-Button-->
          <button
            :class="{
              'bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300  dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900':
                (gameCycle.activeGameState === GameState.GUESS &&
                  controllerStore.itsTurn) ||
                (gameCycle.activeGameState === GameState.MATEGUESS &&
                  !controllerStore.itsTurn),
              'bg-gray-500':
                (gameCycle.activeGameState !== GameState.GUESS &&
                  controllerStore.itsTurn) ||
                (gameCycle.activeGameState !== GameState.MATEGUESS &&
                  !controllerStore.itsTurn),
            }"
            @click="controllerStore.turnLeft(), console.log('left')"
            type="button"
            class="rounded-full px-5 py-5 mb-2"
          >
            <ChevronLeftIcon class="w-10 h-10 text-slate-200">
            </ChevronLeftIcon>
          </button>
          <!--commit-Button-->
          <button
            :class="{
              ' bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800':
                (gameCycle.activeGameState === GameState.DRAWCARD &&
                  controllerStore.itsTurn) ||
                (gameCycle.activeGameState === GameState.MATEGUESS &&
                  !controllerStore.itsTurn) ||
                (gameCycle.activeGameState === GameState.GUESS &&
                  controllerStore.itsTurn) ||
                (gameCycle.activeGameState === GameState.TURNSTART &&
                  controllerStore.itsTurn),
              'bg-gray-500':
                (gameCycle.activeGameState !== GameState.DRAWCARD &&
                  controllerStore.itsTurn) ||
                (gameCycle.activeGameState === GameState.GUESS &&
                  controllerStore.itsTurn) ||
                (gameCycle.activeGameState !== GameState.MATEGUESS &&
                  !controllerStore.itsTurn) ||
                (gameCycle.activeGameState !== GameState.TURNSTART &&
                  controllerStore.itsTurn),
            }"
            @click="controllerStore.commit()"
            type="button"
            class="text-white rounded-full px-10 py-2.5 mx-3 mb-2"
          >
            <ChevronUpIcon class="w-10 h-10 text-slate-200"> </ChevronUpIcon>
            <!--turnLeft-Button-->
          </button>
          <button
            :class="{
              'bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300  dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900':
                (gameCycle.activeGameState === GameState.GUESS &&
                  controllerStore.itsTurn) ||
                (gameCycle.activeGameState === GameState.MATEGUESS &&
                  !controllerStore.itsTurn),
              'bg-gray-500':
                (gameCycle.activeGameState !== GameState.GUESS &&
                  controllerStore.itsTurn) ||
                (gameCycle.activeGameState !== GameState.MATEGUESS &&
                  !controllerStore.itsTurn),
            }"
            @click="controllerStore.turnRight(), console.log('right')"
            type="button"
            class="rounded-full px-5 py-5 mb-2"
          >
            <ChevronRightIcon class="w-10 h-10 text-slate-200">
            </ChevronRightIcon>
          </button>
        </div>
        <!-- Doubt button-->
        <!-- send doubt message to doubt  -->
        <button
          :class="{
            'bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900':
              gameCycle.activeGameState === GameState.WAIT_FOR_DOUBT &&
              !controllerStore.itsTurn,
            'bg-gray-500':
              gameCycle.activeGameState !== GameState.WAIT_FOR_DOUBT ||
              gameCycle.activeGameState == GameState.WAIT_FOR_DOUBT,
          }"
          @click="controllerStore.makeDoubt()"
          type="button"
          class="font-medium rounded-full px-20 py-4 pt-"
        >
          <XMarkIcon class="w-10 h-10 text-slate-200"> </XMarkIcon>
          <!-- <img class="w-10 h-10 rounded-full" src="../assets/icons/unlike.png" alt=""> -->
        </button>
      </div>
    </div>
  </div>
</template>
