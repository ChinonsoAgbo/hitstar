<script setup lang="ts">

import {ref} from 'vue'
import Player from './Player.vue';

interface Player {
  name: string,
  icon: string,
}

const players = ref<Player[]>([
  {
    name: "Harry",
    icon: "/profile-picture-5.jpg",
  },
  {
    name: "Hermione",
    icon: "/profile-picture-3.jpg",
  },
  {
    name: "Ron",
    icon: "/profile-picture-2.jpg",
  },

]);

</script>


<template>

  <div class="m-5">
    <div class="border border-blue-300 shadow rounded-md pb-4">

      <!-- animate the box-->
      <div class="animate-pulse  ">
        <!-- Gamers Grid -->
        <div
            class="flex  flex-row-reverse m-2 p-3  ">
          <!--    justify-center-->
          <!-- To Join Game -->

          <!-- Successfully Joined list-->
          <div class="flex space-x-7 ">

            <Player v-for="player in players" :player="player"></Player>


          </div>
        </div>

      </div>
    </div>


  </div>


</template>