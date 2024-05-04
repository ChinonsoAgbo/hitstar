<script setup lang="ts">
import { useGameStore } from "../stores/gameStore";
import HButton from "../components/HButton.vue";
import HAvatar from "../components/HAvatar.vue";
import { ref } from "vue";

const isLoggedIn = ref(true);
const changeLoginStatus = () => {
  isLoggedIn.value = !isLoggedIn.value;
};
// is used to create a gameStore instance
const gameStore = useGameStore();
//creates a new random SessionID that is stored in the gameStore so it can acces from every Vue
function createSessionId() {
  if (gameStore.getSessionID() == "") { //currently only one game per started server
    let SessionID = self.crypto.randomUUID();
    gameStore.setSessionID(SessionID);
  }
}
</script>

<template>
  <div @click="changeLoginStatus" class="absolute top-5 right-5 h-16 w-16">
    <HAvatar url="/profile-picture-5.jpg"> </HAvatar>
  </div>
  <div
    class="flex flex-col items-center justify-center space-y-3s bg-primary-300 min-h-screen"
  >
    <img
      class="rounded-full w-96 h-96, flex justify-center, align-middle"
      src="/hitstar.jpg"
      alt="image description"
    />

    <div class="items-center space-y-3 grid-cols-2 gap-4">
      <RouterLink v-show="!isLoggedIn" to="/login">
        <HButton class="lg:m-5 m-10">Log in</HButton>
      </RouterLink>

      <RouterLink v-show="!isLoggedIn" to="/register">
        <HButton class="lg:m-5 m-10">Register</HButton>
      </RouterLink>
      <div class="items-center space-y-3 gap-4">
        <RouterLink v-show="isLoggedIn" to="/qr-code">
          <HButton @click="createSessionId, gameStore.startGame">Start game</HButton>
        </RouterLink>
      </div>
    </div>
    <RouterLink to="/">
      <HButton class="lg:m-5 m-10">Game instructions</HButton>
    </RouterLink>
  </div>
</template>
