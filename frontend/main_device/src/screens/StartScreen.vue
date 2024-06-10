<script setup lang="ts">
import { HButton, HAvatar } from "@components/";
import { useSessionStore } from "@shared/stores/sessionStore";
import { ref } from "vue";
import { IMAGE_URL } from "@shared/urls";



const isLoggedIn = ref(true);
const changeLoginStatus = () => {
  isLoggedIn.value = !isLoggedIn.value;
};

// is used to create a sessionStore  instance
//creates a new random SessionID that is stored in the gameStore so it can acces from every Vue

const sessionStore = useSessionStore();



</script>

<template>

  <div @click="changeLoginStatus" class="absolute top-5 right-5 h-16 w-16">
    <HAvatar :url="IMAGE_URL + 'hitstar.jpg'"> </HAvatar>
  </div>
  <div class="flex flex-col items-center justify-center space-y-3s bg-primary-300 min-h-screen">
    <img class="rounded-full w-96 h-96, flex justify-center, align-middle" :src="`${IMAGE_URL}hitstar.jpg`"
      alt="image description" />

    <div class="items-center space-y-3 grid-cols-2 gap-4">
      <RouterLink v-show="!isLoggedIn" to="/login">
        <HButton class="lg:m-5 m-10">Log in</HButton>
      </RouterLink>

      <RouterLink v-show="!isLoggedIn" to="/register">
        <HButton class="lg:m-5 m-10">Register</HButton>
      </RouterLink>
      <div class="items-center space-y-3 gap-4">

        <RouterLink v-show="isLoggedIn" to="/spotify-login">
          <!-- <HButton @click="sessionStore.createSessionID">Start game</HButton> -->
          <HButton>Start game</HButton>

        </RouterLink>
      </div>
    </div>
    <RouterLink to="/">
      <HButton class="lg:m-5 m-10">Game instructions</HButton>
    </RouterLink>
  </div>

</template>
