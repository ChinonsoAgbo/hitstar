<script setup lang="ts">

import { ref } from 'vue'
import Player from '../Player.vue';

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

    <div class="mt-5  mb-10">
        <div class="border border-blue-300 shadow rounded-md p-4 max-w-m w-full mt-auto mx-auto">
          
            <div class="animate-pulse ">
              
                <!-- Gamers Grid -->

                <div
                    class="mt-10  mb-10 w-full grid grid-cols-4  sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 ">
                    <!-- To Join Game -->


                    <div class="relative">
                        <span class="relative flex h-3 w-3">
                            <span
                                class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                            <span class="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                        </span>

                        <div class="rounded-full bg-slate-700 h-10 w-10"></div>
                        <span class="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6"> Joining..
                        </span>

                    </div>

                    <!-- Successfully Joined list-->
                    <Player v-for="player in players" :player="player"> </Player>


                    <!-- <div class="relative">
                        <img class="w-10 h-10 rounded" src="../../assets/image4.png" alt="">
                        <span
                            class="absolute bottom-0 left-8 transform translate-y-1/4 w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
                        <span class="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6"> Gamer2</span>

                    </div>
                    <div class="relative">
                        <img class="w-10 h-10 rounded-full" src="../../assets/image3.png" alt="">
                        <span
                            class="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
                        <span class="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6">Gamer
                            3</span>

                    </div>
                    <div class="relative">
                        <img class="w-10 h-10 rounded" src="../../assets/image2.png" alt="">
                        <span
                            class="absolute bottom-0 left-8 transform translate-y-1/4 w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
                        <span class="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6">Gamer4</span>

                    </div>


                    <div class="relative">
                        <img class="w-10 h-10 rounded" src="../../assets/image6.jpg" alt="">
                        <span
                            class="absolute bottom-0 left-8 transform translate-y-1/4 w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
                        <span class="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6">Gamer
                            5</span>

                    </div> -->




                </div>
            </div>
        </div>




    </div>




</template>