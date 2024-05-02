<script setup lang="ts">
import { useQRCode } from "@vueuse/integrations/useQRCode";

import HButton from "../components/HButton.vue";
import HPlayerNameHorizontal from "../components/HPlayerNameHorizontal.vue";

import HCopy from "../components/HCopy.vue";
import { ref } from "vue";

const url = window.location.href;
const qrcode = useQRCode(url);


import mqtt from "mqtt";
import { MQTTMessage } from "../types";

const client = mqtt.connect("ws://localhost:9001");


interface Player {
  name: string;
  icon: string;
  senderId:string;
}

const players = ref<Player[]>([]);

// subscribing to players to join 
client.subscribe("placeholder/lobby")
client.on("message", function (_, message) {
    const messageStr = message.toString();
    const messageObj = JSON.parse(messageStr);
    
    console.log("user ready to join ",messageObj)

  console.log( messageObj)
if(messageObj){
  const {playerName} =  messageObj
      console.log("New player subscribed:", playerName);
      addPlayer(playerName); // Add the new player to the list
    
}

});

let lobbyMsg: MQTTMessage = {
    topic: 'placeholder/lobby',
    message: {
        senderId: 'placeholder',
        token: 'placeholder',
        playerName: 'placeholder',
        avatarUrl: 'placeholder',
    }
}

client.publish(lobbyMsg.topic, JSON.stringify(lobbyMsg.message))

// Function to add a new player to the list
function addPlayer(playerName: string) {
  // Check if the player is already in the list
  if (!players.value.some(player => player.name === playerName)) { // checking if player haas playerName attr
    console.log("hallo")
    players.value.push({
      name: playerName,
      icon: "/profile-picture-5.jpg", // You can update the icon as needed
    });
  }
  console.log("Player lenth", players.value.length)

}

</script>

<template>
  <div
    class="grid grid-cols-2 gap-4 bg-primary-300 min-h-screen items-center justify-center p-8"
  >
    <div class="flex flex-col items-center space-y-8">
      <h1 class="text-xl font-bold">Join the game using this QR code</h1>
      <img class="rounded-lg w-64 h-64" :src="qrcode" alt="QR Code" />

      <HCopy :url="url"></HCopy>

      <div class="grid grid-cols-2 gap-4">
        <RouterLink to="/game">
          <HButton>Start game</HButton>
        </RouterLink>
        <RouterLink to="/start">
          <HButton>Cancel</HButton>
        </RouterLink>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <RouterLink to="/design-settings">
          <HButton>
            <div class="font-medium text-center inline-flex items-center">
              <div>
                <HSettings></HSettings>
              </div>
              <div>Design settings</div>
            </div>
          </HButton>
        </RouterLink>
        <RouterLink to="/game-settings">
          <HButton>
            <div class="font-medium text-center inline-flex items-center">
              <div>
                <HSettings></HSettings>
              </div>
              <div>Game settings</div>
            </div>
          </HButton>
        </RouterLink>
      </div>
    </div>

    <ul class="max-w-md divide-y divide-secondary-900 dark:divide-gray-700">
      <p class="text-lg font-semibold">Players in the waiting lobby:</p>
      <li class="py-3 sm:py-4">
        <div class="w-full divide-y divide-secondary-900 dark:divide-gray-700">
          <div class="flex flex-col space-y-4 rtl:space-x-reverse">
            <HPlayerNameHorizontal v-for="player in players" :player="player">
            </HPlayerNameHorizontal>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
