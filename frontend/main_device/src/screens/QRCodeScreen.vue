<script setup lang="ts">
import { HButton, HPlayerNameHorizontal, HCopy } from "@components/";
import { useQRCode } from "@vueuse/integrations/useQRCode";
import { useSessionStore } from "@shared/stores/sessionStore";
import { useGameStore } from "@stores/gameStore";
import { Player } from "@shared/types";
import { ref } from "vue";
import mqtt from "mqtt";



const sessionStore = useSessionStore();
const gameStore = useGameStore()
const url = `http://${sessionStore.getIPAddress()}:5174/#/controller-lobby/${sessionStore.getSessionID()}`;
const qrcode = useQRCode(url);


// import { MQTTMessage } from "../types";

const client = mqtt.connect(`ws://${sessionStore.getIPAddress()}:9001`);

// const playersToJoin = useGameStore().pla

const playersReadyTojoin = ref<Player[]>([]);

// subscribing to players
// wait for joining players to publich on joing
client.subscribe(`${sessionStore.getSessionID()}/lobby`);

client.on("message", function (_, message) {
  let msg = JSON.parse(message.toString())
  let player : Player = {
    id : msg.senderId, 
    name : msg.playerName, 
    iconURL : msg.avatarUrl,
    tokens : 3, 
    cards:[    {
          id: "1",
          title: "HITSTAR",
          year: 1920,
          interpreter: "HITSTAR",
          position: 5,
        }],
    guessedCardIndex : 5,
    lastGuessedCardIndex: 5,
    minCardIndex : 0,
    maxCardIndex : 10,    
  }
  if(gameStore.players.filter(p=> p.id === player.id).length === 0 && !msg.isLeaving){
    gameStore.players.push(player)
  }
  if(gameStore.players.filter(p=> p.id === player.id).length !== 0 && msg.isLeaving){
    console.log(gameStore.players)
    gameStore.players = gameStore.players.filter(p=> p.id !== player.id)

  }

  const messageStr = message.toString();
  const messageObj = JSON.parse(messageStr);

  console.log("user ready to join ", messageObj);
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
  

    playersReadyTojoin.value.push({
      id: incomingPlayer.senderId,
      name: incomingPlayer.playerName,
      icon: "profile-picture-5.jpg",
      tokens: incomingPlayer.tokens,
      cards: incomingPlayer.cards,
    });
  }
  console.log("Player lenth", playersReadyTojoin.value.length);
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

      <div class="grid grid-cols-2 gap-4 items-stretch justify-center">
        <RouterLink to="/game">
          <!-- A Button for starting a Game -->
          <HButton>Start game</HButton>
        </RouterLink>
        <RouterLink to="/start">
          <!-- A button to cancel the game creation  -->
          <HButton>Cancel</HButton>
        </RouterLink>
        <RouterLink to="/design-settings">
          <!-- A button to go to  the Design settings  -->
          <HButton>Design settings</HButton>
        </RouterLink>
        <RouterLink to="/game-settings">
          <!-- A button to go to  the Game settings  -->
          <HButton>Game settings</HButton>
        </RouterLink>
      </div>
    </div>
    <!-- Creates a List of Users that are Connected to the server and are connceted  -->
    <ul class="max-w-md divide-y divide-secondary-900 dark:divide-gray-700">
      <p class="text-lg font-semibold">Players in the waiting lobby:</p>
      <li class="py-3 sm:py-4">
        <div class="w-full divide-y divide-secondary-900 dark:divide-gray-700">
          <div class="flex flex-col space-y-4 rtl:space-x-reverse">
            <HPlayerNameHorizontal
              v-for="player in gameStore.players"
              :player="player"
            >
            </HPlayerNameHorizontal>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
