<script setup lang="ts">
import { HButton, HAvatar } from "@components/";
import { useSessionStore } from "@shared/stores/sessionStore";
import { ref, onMounted } from "vue";
import { IMAGE_URL } from "@shared/urls";

import { useSpotifyStore } from "@stores/spotifyStore.ts";

const spotifyStore = useSpotifyStore();
// parse the URL to retrieve the code parameter for spotify Token
const code = new URLSearchParams(window.location.search).get("code"); // get access code
const currentStep = ref(1)


const isLoggedIn = ref(true);
const changeLoginStatus = () => {
  isLoggedIn.value = !isLoggedIn.value;
};

const startGame = (newValue: boolean) => { // show the button to sart game 
  if (newValue) {
    setStep(3)
  }
}
const setStep = (step: number) => {
  currentStep.value = step;
}

const stepClass = (step: number) => {
  return currentStep.value >= step ? 'text-blue-600 dark:text-blue-500' : 'text-gray-500 dark:text-gray-700';
};


const redirectToAuthCodeFlow = () => {
  spotifyStore.redirectToAuthCodeFlow();

}

if (code) {
  spotifyStore.getLocalToken(code)  //  fetch token
    .then((accessToken) => {
      console.log("Access Token", accessToken);
      spotifyStore.setToken(accessToken)
      setStep(2)

    }).catch(error => {
      console.error("Error fetching access token:", error);
    });
}



// is used to create a sessionStore  instance
const sessionStore = useSessionStore();

const script = document.createElement('script');
script.src = 'https://sdk.scdn.co/spotify-player.js';
script.async = true;

document.body.appendChild(script);

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

  <div class=" bg-primary-300 min-h-screen">
    <div @click="changeLoginStatus" class="absolute top-5 right-5 h-16 w-16">
      <HAvatar :url="IMAGE_URL + 'hitstar.jpg'"> </HAvatar>
    </div>

    <div class=" flex justify-center pt-10 ">
      <!-- <img v-if="currentStep == 2" class=" w-60 h-70   justify-center, align-middle" :src="`${IMAGE_URL}hitstarPlayer.png`"
      alt="image description" /> -->

      <img class=" rounded-full w-80 h-80  justify-center, align-middle" :src="`${IMAGE_URL}hitstar.jpg`"
        alt="image description" />
    </div>

    <div class="">

      <ol class="flex  w-full text-base font-semibold text-center absolute top-96 px-16   text-gray-500 dark:text-whi ">

        <div class=" flex  w-full">
          <li
            :class="[stepClass(1), 'flex md:w-full items-center sm:after:content-[\'\'] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700']">
            <span class="flex items-center">
              <svg v-if="currentStep >= 1" class="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5" aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              Login <span class="hidden sm:inline-flex sm:ms-2"> to</span> <span
                class="hidden sm:inline-flex sm:ms-2">spotify</span>

            </span>
          </li>
          <li
            :class="[stepClass(2), 'flex md:w-full items-center sm:after:content-[\'\'] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700']">
            <span class="flex items-center">
              Connect in Spotify App to (Hitstar player)
            </span>
          </li>

          <li :class="[stepClass(3), 'flex items-center']">
            <svg v-if="currentStep >= 3"  class="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
            </svg>
            <span :class="spotifyStore.is_active ? setStep(3) : startGame(spotifyStore.is_active)" class="me-2"> Start </span> game!
          </li>

        </div>
      </ol>

    </div>



    <div class="flex flex-col items-center pt-36 space-y-3s  min-h-screen">



      <div class="items-center space-y-3 grid-cols-2 gap-4">
        <RouterLink v-show="!isLoggedIn" to="/login">
          <HButton class="lg:m-5 m-10">Log in</HButton>
        </RouterLink>

        <RouterLink v-show="!isLoggedIn" to="/register">
          <HButton class="lg:m-5 m-10">Register</HButton>
        </RouterLink>

        <div class="items-center space-y-3 gap-4">
          <RouterLink v-show="isLoggedIn && code && spotifyStore.is_active" to="/qr-code">
            <HButton @click="sessionStore.createSessionID">Start game</HButton>

          </RouterLink>

          <HButton v-show="!code" @click="redirectToAuthCodeFlow"> Login to Spotify</HButton>
        </div>
      </div>
      <!-- <RouterLink to="/">
        <HButton class="lg:m-5 m-10">Game instructions</HButton>
      </RouterLink> -->
    </div>


  </div>

</template>
