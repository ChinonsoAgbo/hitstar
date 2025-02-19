<script setup lang="ts">
import { HButton, HAvatar } from "@components/";
import { useSessionStore } from "@shared/stores/sessionStore";
import { ref, onMounted } from "vue";
import { IMAGE_URL } from "@shared/urls";

import { useSpotifyStore } from "@stores/spotifyStore.ts";
import TimeLineStep from "@components/TimeLineStep.vue";
import {UserIcon, ArrowLeftIcon, MusicalNoteIcon} from "@heroicons/vue/24/solid";
import HWarning from "@components/HWarning.vue";

const spotifyStore = useSpotifyStore();
// parse the URL to retrieve the code parameter for spotify Token
const code = new URLSearchParams(window.location.search).get("code"); // get access code
const currentStep = ref(0)

// is used to create a sessionStore  instance
const sessionStore = useSessionStore();

const infoText= ref("");

async function createGame() {
  console.log("submit button works!")
  if(sessionStore.getSessionID() == ""){
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user ? user.token : null;
      const id = user ? user.id : null;


      if (!token) {
        throw new Error('No token found');
      }

      const response = await fetch(`${import.meta.env.VITE_IP_ADRESS_WITH_HTTP}:8080/game`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          creationTime: new Date().getTime(),
          account:{
            id:id
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Creating Game failed');
      }
      const data = await response.json();
      sessionStore.setSessionID(data.gameUrl)
      localStorage.setItem('game', JSON.stringify(data))
      infoText.value='Game was created successfully';
      sessionStore.setInfoTextAvailable(true);
      sessionStore.setGameCreated(true);
      console.log(data);
    } catch (error) {
      console.log(error)
      infoText.value=error.message;
    }
  }
}



const startGame = (newValue: boolean) => { // show the button to sart game 
  if (newValue) {
    setStep(3)
  }
}
const setStep = (step: number) => {
  currentStep.value = step;
}

const stepClass = (step: number) => {
  return currentStep.value > step

    ? 'after:border-[#1DB954] dark:after:border-[#1DB954]'

    : 'after:border-gray-100 dark:after:border-gray-700';
};

const redirectToAuthCodeFlow = () => {

  // let clientId = localStorage.getItem("clientId");
  let clientId =  spotifyStore.getClientId(); // assumming the clientId is saved before 
  const requiredLength = 32; // The length of 'fd8a308b3a7b447793f4afa372cf4d3f'

  if (clientId && clientId.length === requiredLength) {

      spotifyStore.redirectToAuthCodeFlow();

  } else {
    clientId = prompt("Enter your spotify client id:");

    if (clientId && clientId.length === requiredLength) {
      localStorage.setItem('clientId', clientId); // save new client id 

        spotifyStore.redirectToAuthCodeFlow();
    } else {
      alert(`Client ID must be exactly ${requiredLength} characters long.`);
    }
  }
}



if (code) {
  spotifyStore.getLocalToken(code)  //  fetch token
    .then((accessToken) => {
      console.log("Access Token", accessToken);
      spotifyStore.setToken(accessToken)


    }).catch(error => {
      console.error("Error fetching access token:", error);
    });
  if (spotifyStore.is_active) {
    stepClass(3)
  } else {
    setStep(2)
  }

}


if (code) {
const script = document.createElement('script');
script.src = 'https://sdk.scdn.co/spotify-player.js';
script.async = true;

document.body.appendChild(script);
}
onMounted(() => {


  window.onSpotifyWebPlaybackSDKReady = () => {
    const player = new window.Spotify.Player({
      name: 'Hitstar Player',
      getOAuthToken: (cb) => {
        cb(spotifyStore.token);
      },
      volume: 0.5,
    });

    spotifyStore.setPlayer(player);

    spotifyStore.player.addListener('ready', ({ device_id }) => {
      console.log('Ready with Device ID', device_id);
    });

    spotifyStore.player.addListener('not_ready', ({ device_id }) => {
      console.log('Device ID has gone offline', device_id);
    });

    spotifyStore.player.addListener('player_state_changed', (state) => {
      if (!state) {
        return;
      }

      spotifyStore.setTrack(state.track_window.current_track); // hier kannst du playlist checkin g setzen 
      spotifyStore.setPaused(state.paused);

      spotifyStore.player.getCurrentState().then((state) => {
        !state ? spotifyStore.setActive(false) : spotifyStore.setActive(true);
        //  startGame(state)
      });
    });

    spotifyStore.player.connect();
  };

});

</script>

<template>
  <form @submit.prevent="createGame">
    <div class="absolute p-5 top-[10%] right-[10%] h-[80%] w-[40%] rounded-lg \
                gap-2 backdrop-blur-md flex flex-col items-stretch justify-center">

      <RouterLink to="/start">
        <HButton class="fixed -top-5 -right-5 flex justify-around items-center">
          <ArrowLeftIcon class="w-8 h-8 mr-5" />
          BACK
        </HButton>
      </RouterLink>

      <ol class="relative m-5 border-s border-gray-200 dark:border-gray-700">
        <TimeLineStep subtitle="1.)" :done="currentStep > 0">
          <template #default>
            SPOTIFY LOGIN
          </template>
          <template #button>
            <HButton  v-show="!code" @click="redirectToAuthCodeFlow">LOGIN TO SPOTIFY</HButton>
          </template>
        </TimeLineStep>
        <TimeLineStep subtitle="2.)" :done="currentStep > 1">
          CHOOSE HITSTAR IN SPOTIFY APP
        </TimeLineStep>
        <TimeLineStep subtitle="3.)" :done="spotifyStore.is_active">
          <template #default>
            START GAME!
          </template>
          <template #button>
            <HButton v-show="code && spotifyStore.is_active" type="submit" class="animate-pulse w-full flex justify-around items-center">
              CREATE GAME
              <MusicalNoteIcon class="w-8 h-8 mx-5" />
            </HButton>
            <RouterLink v-show="code && spotifyStore.is_active && sessionStore.getGameCreated()" to="/qr-code">
                <HButton class="animate-pulse w-full flex justify-around items-center">
                  START GAME
                  <MusicalNoteIcon class="w-8 h-8 mx-5" />
                </HButton>
            </RouterLink>
          </template>

        </TimeLineStep>
      </ol>
      <HWarning v-if="sessionStore.getInfoTextAvailable()">
        <p class="text-blue-500 text-lg mt-1">{{infoText}}</p>
      </HWarning>

    </div>
  </form>

    <!--    <div class="flex-col  w-full ">-->
<!--    <div>-->

<!--      <ol-->
<!--        class=" flex   text-lg font-semibold  text-black-600 dark:text-black-500  p-24   ">-->

<!--        <div class=" flex  w-full">-->
<!--          <li-->
<!--            :class="[stepClass(1), 'flex md:w-full items-center sm:after:content-[\'\'] after:w-full after:h-1 after:border-b after:border-4 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-6']">-->
<!--            <span class="flex items-center rounded-lg"-->
<!--              :class="currentStep >= 1 ? 'text-black-600 dark:text-black-500 bg-primary-100 dark:bg-[#1DB954]  ' : 'bg-gray-100 dark:bg-gray-700'">-->

<!--              <svg v-if="currentStep >= 1" class="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5" aria-hidden="true"-->
<!--                xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">-->
<!--                <path-->
<!--                  d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />-->
<!--              </svg>-->
<!--              Login <span class="hidden sm:inline-flex sm:ms-2"> to</span> <span-->
<!--                class="hidden sm:inline-flex sm:ms-2">spotify</span>-->
<!--            </span>-->

<!--          </li>-->
<!--       -->
<!--          <li-->
<!--            :class="[stepClass(2), 'flex md:w-full items-center sm:after:content-[\'\'] after:w-full after:h-1 after:border-b after:border-4 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-6']">-->
<!--            <span class="flex items-center rounded-lg  "-->
<!--              :class="currentStep >= 2 ? ' bg-blue-100 dark:bg-[#1DB954]  ' : 'bg-gray dark:bg-gray'">-->
<!--              Connect in Spotify App to (Hitstar player)-->
<!--            </span>-->
<!--          </li>-->

<!--          <li :class="[stepClass(3), 'flex items-center']">-->
<!--            <span class="flex items-center rounded-lg  "-->
<!--              :class="currentStep >= 3 ? ' bg-blue-100 dark:bg-[#1DB954] ' : 'bg-gray dark:bg-gray'">-->
<!--              <svg v-if="currentStep >= 3" class="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5" aria-hidden="true"-->
<!--                xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">-->
<!--                <path-->
<!--                  d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />-->
<!--              </svg>-->
<!--              <span :class="spotifyStore.is_active ? setStep(3) : startGame(spotifyStore.is_active)" class="me-2"> Start-->
<!--            -->
<!--          </span> game! <p v-if="spotifyStore.is_active" >😎</p>-->
<!--            </span>-->
<!--          </li>-->

<!--        </div>-->
<!--      </ol>-->

<!--    </div>-->
<!--    &lt;!&ndash; min-h-screen &ndash;&gt;-->

<!--    <div class="flex w-full items-center justify-center  ">-->

<!--        <div class=" ">-->

<!--          <RouterLink v-show="!code" to="/start"> -->
<!--            <HButton  v-show="!code"> Move back </HButton>-->
<!--          </RouterLink>-->
<!--        -->
<!--          <HButton  v-show="!code" @click="redirectToAuthCodeFlow"> Login to Spotify</HButton>-->

<!--          <RouterLink v-show="code && spotifyStore.is_active" to="/qr-code">-->
<!--            <HButton @click="sessionStore.createSessionID">Start game</HButton>-->

<!--          </RouterLink>-->

<!--        </div>-->

<!--      </div>-->
<!--    -->
<!--    </div>-->


</template>
