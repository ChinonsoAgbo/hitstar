<script setup lang="ts">
import { HButton, HAvatar } from "@components/";
import { IMAGE_URL } from "@shared/urls";
import { ArrowRightEndOnRectangleIcon, UserIcon, MusicalNoteIcon, PuzzlePieceIcon } from "@heroicons/vue/24/solid";
import {useAccountStore} from "@stores/accountStore";
import HWarning from "@components/HWarning.vue";

const accountStore = useAccountStore()

// is used to create a sessionStore  instance
//creates a new random SessionID that is stored in the gameStore so it can acces from every Vue



</script>

<template>

  <div v-if="accountStore.loggedIn" @click="accountStore.changeInterface" class="hover:cursor-pointer absolute top-5 right-5 h-16 w-16 flex flex-col items-center justify-between">
    <HAvatar :url="IMAGE_URL + 'avatar.bmp'" />
  </div>

  <div class="flex items-center justify-evenly min-h-screen">

    <div class="absolute p-5 top-[30%] right-[15%] h-[40%] w-[30%] rounded-lg gap-2 backdrop-blur-md flex flex-col items-stretch justify-center">
      <HWarning v-if="!accountStore.loggedIn">
        <p v-if="!accountStore.loggedIn" class="text-red-500 text-lg mt-1">Please log in before starting a game.</p>
      </HWarning>
      <RouterLink v-show="!accountStore.showLoginButtons" to="/spotify-login">
        <!-- <HButton @click="sessionStore.createSessionID">Start game</HButton> -->
        <HButton class="animate-pulse w-full flex justify-around items-center">
          START GAME
          <MusicalNoteIcon class="w-8 h-8 mx-5" />
        </HButton>
      </RouterLink>

      <RouterLink v-show="accountStore.showLoginButtons" to="/login">
        <HButton class="w-full flex justify-around items-center">
          LOG IN
          <UserIcon class="w-8 h-8 mx-5" />
        </HButton>
      </RouterLink>

      <RouterLink v-show="accountStore.showLoginButtons" to="/register">
        <HButton class="w-full flex justify-around items-center">
          REGISTER
          <ArrowRightEndOnRectangleIcon class="w-8 h-8 mx-5" />
        </HButton>
      </RouterLink>
      

      <RouterLink v-show="!accountStore.showLoginButtons"  to="/game-instructions">
        <HButton class="w-full flex justify-around items-center">
          INSTRUCTIONS
          <PuzzlePieceIcon class="w-8 h-8 mx-5" />
        </HButton>
      </RouterLink>

    </div>
    
  </div>

</template>