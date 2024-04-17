<script setup lang="ts" >
import WaitingGamers from '../components/lobbyWaitingLists/WaitingGamers.vue';

import GameLogo from "../components/GameLogo.vue"
import HButton from '../components/HButton.vue'


</script>

<template>
    <h1>Controller Lobby</h1>
<!-- Logo -->
    <GameLogo></GameLogo>  <!-- Logo über HCard compo-->

    <div class="container mx-auto  ">
        <h3 class="mb-1 text-center text-lg font-semibold text-gray-900 dark:text-Grey"> Wait for Hitstars to join before starting the Game ! </h3>


            <!-- Joining Icons and List -->
       
            <div>
                <WaitingGamers> </WaitingGamers>
            </div>
 

                <!-- End of Joining icons -->
      
        <!-- Start game button -->

        <div class="relative mt-10  mb-10 z-0 w-full  grid grid-flow-col">

            <HButton class=" bg-red-700"> Exit Game </HButton>
                <!-- <HButton class="">  </HButton> -->

               

        </div>   

        </div>

</template>