<script setup lang="ts">

import {IMAGE_URL} from "@shared/urls";
</script>

<template>

  <div class="bg-[url('http://localhost:8081/images/stage.bmp')] bg-center bg-cover fixed top-0 left-0 w-full h-full"></div>

    <div class="absolute top-[10%] left-[10%] background-animate p-5 flex justify-center align-middle rounded-full backdrop-blur-md bg-gradient-to-r from-orange-500 to-blue-800">
      <img class="rounded-full w-96 h-96 flex justify-center align-middle" :src="`${IMAGE_URL}hitstar.jpg`"
           alt="image description" />
    </div>

    <RouterView />
</template>

<style scoped>
.background-animate {
  background-size: 400%;
  -webkit-animation: AnimationName 15s ease infinite;
  -moz-animation: AnimationName 15s ease infinite;
  animation: AnimationName 15s ease infinite;
}

@keyframes AnimationName {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}
</style>


