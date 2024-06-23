<script setup lang="ts">
import { HButton, HPlayerNameHorizontal, HCopy } from "@components/";
import { useQRCode } from "@vueuse/integrations/useQRCode";
import { useSessionStore } from "@shared/stores/sessionStore";
import { useGameStore } from "@stores/gameStore";
import { Player } from "@shared/types";
import { ref } from "vue";
import mqtt from "mqtt";
import {ArrowLeftIcon, MusicalNoteIcon, SwatchIcon} from "@heroicons/vue/24/solid";
import {router} from "../router";



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
    cards:[],
    guessedCardIndex : 5,
    color: gameStore.colors.pop()!,
    removedAt: 'left'
  }

  //     id: "1",
  //     name: "Player 2",
  //     tokens: 3,
  //     cards: [],
  //     iconURL: "image2.png",
  //     color: "green",
  //     guessedCardIndex: 4,
  // },

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

// Function to add a new player to the lobby waiting list
function addPlayer(incomingPlayer: any) {
  // could check if player is already in the list
  //if (!players.value.some(player => player.name === playerName)) {
  if (incomingPlayer) {
    playersReadyTojoin.value.push(incomingPlayer);
  }
  console.log("Player lenth", playersReadyTojoin.value.length);
}

async function deleteGame() {
  console.log("submit button works!")
    try {
      console.log(localStorage.getItem('game'));
      const game = JSON.parse(localStorage.getItem('game'));
      console.log(game);
      const id = game ? game.id : null;

      const user = JSON.parse(localStorage.getItem('user'));
      const token = user ? user.token : null;

      const response = await fetch('http://localhost:8080/game/'+id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Deleting Game failed');
      }
      sessionStore.setSessionID("")
      localStorage.removeItem('game')
      sessionStore.setGameCreated(false);
      console.log("Game was deleted successfully!")
      await router.push('/start');
    } catch (error) {
      console.log(error)
    }

}

async function savePlayers() {
  console.log("submit button works!")
    try {
      const game = JSON.parse(localStorage.getItem('game'));
      const id = game ? game.id : null;

      const user = JSON.parse(localStorage.getItem('user'));
      const token = user ? user.token : null;

      for(const player of gameStore.players) {
        const response = await fetch('http://localhost:8080/player', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            playerName: player.name,
            avatarURL: player.iconURL,
            game:{
              id:id
            }
          }),
        });

        if (!response.ok) {
          throw new Error('Saving Player failed');
        }
        console.log("Saving successful for player" + player.name);
        const data = await response.json();

        localStorage.setItem(player.id , JSON.stringify(data));
        console.log(JSON.stringify(data))
      }
      await router.push('/game')
    } catch (error) {
      console.log(error)
    }

}

</script>

<template>
  <div
    class="min-h-screen"
  >

    <!-- Creates a List of Users that are Connected to the server and are connceted  -->

    <div class="absolute p-5 top-[10%] left-[5%] h-[80%] w-[90%] rounded-lg gap-2 backdrop-blur-md grid grid-cols-2">
      <form @submit.prevent="deleteGame">
        <HButton type="submit" class="fixed -top-5 -right-5 flex justify-around items-center">
          <ArrowLeftIcon class="w-8 h-8 mr-5" />
          BACK
        </HButton>
      </form>

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
      <form @submit.prevent="savePlayers">
        <HButton type="submit" class="animate-pulse w-full flex justify-around items-center">
          START GAME
          <MusicalNoteIcon class="w-8 h-8 mx-5" />
        </HButton>
      </form>
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
