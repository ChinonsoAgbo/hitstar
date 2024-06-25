<script setup lang="ts">
import { IMAGE_URL, SOUND_URL } from "@shared/urls";
import { onMounted, watch, ref } from "vue";
import { useRoute } from "vue-router";

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
const bg_url = ref(`${IMAGE_URL}stage.jpg`)
</script>

<template>

  <div class="bg-img" :style="{ backgroundImage: 'url(' + bg_url + ')' }"></div>

  <div class="fixed top-0 left-[10%] h-full flex items-center justify-center">
    <div
      class="background-animate p-5 flex justify-center align-middle rounded-full backdrop-blur-md bg-gradient-to-r from-orange-500 to-blue-800">
      <img class="rounded-full w-96 h-96 flex justify-center align-middle" :src="`${IMAGE_URL}hitstar.jpg`"
        alt="image description" />
    </div>
  </div>
  <RouterView />
</template>

<style scoped>
.bg-img {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

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