<script setup lang="ts">
import HButton from "../components/HButton.vue";
import HAvatar from "../components/HAvatar.vue";
import { ref } from "vue";

const isLoggedIn = ref(true);
const changeLoginStatus = () => {
  isLoggedIn.value = !isLoggedIn.value;
};
</script>

<template>
  <div v-show="isLoggedIn" class="absolute top-5 right-5 h-16 w-16">
    <HAvatar
      class="font-medium text-gray-600 dark:text-gray-300, overflow-visible"
      >HS
      <span class="border-white dark:border-gray-800 rounded-full"></span>
    </HAvatar>
  </div>
  <div
    class="flex flex-col items-center justify-center space-y-3s bg-primary-300 min-h-screen"
  >
    <img
      class="rounded-full w-96 h-96, flex justify-center, align-middle"
      src="../assets/hitstar.jpg"
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
          <HButton>Start game</HButton>
        </RouterLink>
      </div>
    </div>
    <RouterLink to="/">
      <HButton @click="changeLoginStatus" class="lg:m-5 m-10"
        >Game instructions</HButton
      >
    </RouterLink>
  </div>
</template>
