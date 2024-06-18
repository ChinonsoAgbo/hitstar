<script setup lang="ts">
import {IMAGE_URL, SOUND_URL} from "@shared/urls";
import {onMounted, watch} from "vue";
import {useRoute} from "vue-router";

const music = new Audio(`${SOUND_URL}8Bit_music.mp3`);

const route = useRoute();

onMounted(() => {
  music.loop = true;
  music.autoplay = true;
  music.volume = 0.2;
});

watch(route, (before, after) => {

  console.log("ROUTE", before.path, after.path);

  if (after.path === "/game") {
    music.pause();
  }
  if (after.path === "/end") {
    music.play();
  }
})
</script>

<template>

  <div class="bg-[url('http://localhost:8081/images/stage.jpg')] bg-center bg-cover fixed top-0 left-0 w-full h-full"></div>

    <div class="absolute top-[20%] left-[10%] background-animate p-5 flex justify-center align-middle rounded-full backdrop-blur-md bg-gradient-to-r from-orange-500 to-blue-800">
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


