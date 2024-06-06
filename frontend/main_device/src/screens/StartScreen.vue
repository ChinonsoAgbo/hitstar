<script setup lang="ts">
import { HButton, HAvatar } from "@components/";
import { useSessionStore } from "@shared/stores/sessionStore";
import { ref,onMounted } from "vue";
import { IMAGE_URL } from "@shared/urls";

import { useSpotifyStore } from "@stores/spotifyStore.ts";

import WebPlayback from "../components/WebPlayback.vue";

const spotifyStore = useSpotifyStore();
// parse the URL to retrieve the code parameter
const code = new URLSearchParams(window.location.search).get("code"); // get access code




if (!code) {
  spotifyStore.redirectToAuthCodeFlow(); // make sure the user accepts
} else if (code) {
  spotifyStore.getLocalToken(code)  //  fetch token
    .then((accessToken) => {
      console.log("Access Token", accessToken);

      spotifyStore.setToken(accessToken)
      //init(accessToken)

    }).catch(error => {
      console.error("Error fetching access token:", error);
    });

}


const isLoggedIn = ref(true);
const changeLoginStatus = () => {
  isLoggedIn.value = !isLoggedIn.value;
};

// is used to create a sessionStore  instance
const sessionStore = useSessionStore();




//creates a new random SessionID that is stored in the gameStore so it can acces from every Vue


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
        //  cb(store.token.value);

      },
      volume: 0.5,
    });

    spotifyStore.setPlayer(player);
    // console.log(props.token);

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
      });
    });


    spotifyStore.player.connect();
  };


});




</script>

<template>
  <p> activ:{{ spotifyStore.is_active }}</p>

  <div @click="changeLoginStatus" class="absolute top-5 right-5 h-16 w-16">
    <HAvatar :url="IMAGE_URL + 'hitstar.jpg'"> </HAvatar>
  </div>
  <div class="flex flex-col items-center justify-center space-y-3s bg-primary-300 min-h-screen">
    <img class="rounded-full w-96 h-96, flex justify-center, align-middle" :src="`${IMAGE_URL}hitstar.jpg`"
      alt="image description" />

    <div class="items-center space-y-3 grid-cols-2 gap-4">
      <RouterLink v-show="!isLoggedIn" to="/login">
        <HButton class="lg:m-5 m-10">Log in</HButton>
      </RouterLink>

      <RouterLink v-show="!isLoggedIn" to="/register">
        <HButton class="lg:m-5 m-10">Register</HButton>
      </RouterLink>
      <div class="items-center space-y-3 gap-4">
        <RouterLink v-show="isLoggedIn" to="/qr-code">
          <HButton @click="sessionStore.createSessionID">Start game</HButton>
        </RouterLink>
      </div>
    </div>
    <RouterLink to="/">
      <HButton class="lg:m-5 m-10">Game instructions</HButton>
    </RouterLink>
  </div>

  <!-- <WebPlayback v-if="spotifyStore.token" :token="spotifyStore.token" /> -->
  <!-- {{ spotifyStore.token }}  -->
</template>
