<script setup lang="ts">
import { HButton, HPlayerNameHorizontal, HCopy } from "@components/";
import { useQRCode } from "@vueuse/integrations/useQRCode";
import { useSessionStore } from "@shared/stores/sessionStore";
import { useGameStore } from "@stores/gameStore";
import { Player } from "@shared/types";
import { ref } from "vue";
import mqtt from "mqtt";
import {ArrowLeftIcon, MusicalNoteIcon, SwatchIcon} from "@heroicons/vue/24/solid";



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
    cards:[
        gameStore.drawPile.pop()!,
    ],
    guessedCardIndex : 5,
    lastGuessedCardIndex: 5,
    minCardIndex : 0,
    maxCardIndex : 10,
    color: gameStore.colors.pop()!
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
    playersReadyTojoin.value.push(incomingPlayer);
  }
  console.log("Player lenth", playersReadyTojoin.value.length);
}

</script>

<template>
  <div
    class="min-h-screen"
  >

    <!-- Creates a List of Users that are Connected to the server and are connceted  -->

    <div class="absolute p-5 top-[10%] left-[5%] h-[80%] w-[90%] rounded-lg gap-2 backdrop-blur-md grid grid-cols-2">

      <RouterLink to="/start">
        <HButton class="fixed -top-5 -right-5 flex justify-around items-center">
          <ArrowLeftIcon class="w-8 h-8 mr-5" />
          BACK
        </HButton>
      </RouterLink>

      <div class="flex flex-col items-center space-y-8">
        <h1 class="text-xl font-bold text-white">JOIN THE GAME</h1>
        <div class="p-2 flex justify-center rounded-lg align-middle backdrop-blur-md bg-gradient-to-r from-orange-500 to-blue-800">
          <img class="rounded-lg w-64 h-64" :src="qrcode" alt="QR Code" />
        </div>
        <HCopy :url="url"></HCopy>
      </div>

      <ul class="max-w-md divide-y divide-secondary-900 dark:divide-gray-700">
        <p class="absolute top-5 text-2xl font-semibold text-white">WAITING LOBBY</p>

          <div class="absolute top-14 w-[40%] px-10 py-5">

              <HPlayerNameHorizontal
                  v-for="player in gameStore.players"
                  :player="player">

              </HPlayerNameHorizontal>
          </div>
      </ul>

    </div>

    <div class="absolute bottom-5 left-5 grid grid-cols-4 gap-4 items-stretch justify-center">
      <RouterLink to="/game">
        <HButton class="animate-pulse w-full flex justify-around items-center">
          START GAME
          <MusicalNoteIcon class="w-8 h-8 mx-5" />
        </HButton>
      </RouterLink>
      <RouterLink to="/design-settings">
        <!-- A button to go to  the Design settings  -->
        <HButton class="w-full flex justify-around items-center">
          DESIGN SETTINGS
          <SwatchIcon class="w-8 h-8 mx-5" />
        </HButton>
      </RouterLink>
    </div>

  </div>
</template>
