<script setup lang="ts">

import {ref} from 'vue'
import HPlayer from './HPlayer.vue';
import mqtt from "mqtt";
import { lobbyMsg ,Player} from "../types/index.ts"

const client = mqtt.connect("ws://localhost:9001");


const playersReadyTojoin = ref<Player[]>([ /*list of joinend players */]);

// subscribing to players
// wait for joining players to publich on joing  
client.subscribe("placeholder/lobby")
client.on("message", function (_, message) {
  const messageStr = message.toString();
  const messageObj = JSON.parse(messageStr);

  console.log("user ready to join ", messageObj)
  if (messageObj) {
   // const { message } = messageObj

    console.log("New player subscribed:", messageObj.playerName);
    addPlayer(messageObj); // Add the new player to the list

  }

});


// Function to add a new player to the lobby waaiting list
function addPlayer(incomingPlayer: any) {
  // could check if player is already in the list
  //if (!players.value.some(player => player.name === playerName)) { 
    if (incomingPlayer) {
    console.log("hallo")

    playersReadyTojoin.value.push({
      id: incomingPlayer.senderId,
      name: incomingPlayer.playerName,
      icon: "/profile-picture-5.jpg",
      tokens: incomingPlayer.tokens,
      cards: incomingPlayer.cards,
     
    });
  }
}

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

            <HPlayer v-for="player in playersReadyTojoin" :player="player"></HPlayer>


          </div>
        </div>

      </div>
    </div>


  </div>


</template>