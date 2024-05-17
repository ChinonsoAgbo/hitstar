<script setup lang="ts">
import { HButton, HAvatar } from "@components/";
import { useSessionStore } from "@shared/stores/sessionStore";
import { ref } from "vue";
import { IMAGE_URL } from "@shared/urls";
// import {
//   clientId,
//   getLocalToken,
//   redirectToAuthCodeFlow,
// } from "../spotifyAPIAUTH/todos.ts";
// import { fetchUserPlaylist } from "../spotifyAPIAUTH/playlist.ts";
// import { fetchUserProfile } from "../spotifyAPIAUTH/profile.ts";
// import {
//   fetchSerch,
//   play,
//   searchTerm,
//   conn,
// } from "../spotifyAPIAUTH/search.ts";
//
// import { PauseIcon, PlayIcon } from "@heroicons/vue/24/outline";

const isLoggedIn = ref(true);
const changeLoginStatus = () => {
  isLoggedIn.value = !isLoggedIn.value;
};

// is used to create a sessionStore  instance
const sessionStore = useSessionStore();

//creates a new random SessionID that is stored in the gameStore so it can acces from every Vue

// parse the URL to retrieve the code parameter
const code = new URLSearchParams(window.location.search).get("code"); // get access code
const error = new URLSearchParams(window.location.search).get("error"); // get acees denied
// console.log(code)
//if (!code) {
// redirectToAuthCodeFlow(clientId); // make sure the user accepts
//} else if (code) { //  fetch token
// getLocalToken(clientId, code)
//   .then((accessToken) => {
//   console.log("Access Token", accessToken);
//
//conn.token = accessToken;
//console.log("token:" + token)
//   fetchUserProfile(conn.token!).then((value) => {
//     console.log(value);
//  });
//   fetchUserPlaylist(conn.token!).then((value) => {
//   console.log(value);
//   });
//    fetchSerch(conn.token!, "Sam smit").then((value) => {
//    console.log("seachFetch:  ", value);
//   console.log("body", searchTerm.uri);
// call play here to see
//   play(conn.token!,searchTerm.uri!).then((value) => {
//   console.log("player:  ",value)
//   console.log("body",searchTerm.uri)
// });
// });
//}).catch(error => {
//  console.error("Error fetching access token:", error);
// });
//} else {
//console.error(error);
//}
// //console.log("token in start screen", conn.token)
// //-------------------------------------------------------------------------- Checking mussic dingPlayback ------------------
// const isMusicPlaying = ref(true);
// const changePlaySate = () => {
//   isMusicPlaying.value = !isMusicPlaying.value;
// };
// const musicState = ref(true);
// const changeMusicSate = () => {
//   musicState.value = !musicState.value;
//   player.togglePlay();
// };
// const musicPlayDuration = 5000;
// let player: Spotify.Player | null = null;
//   window.onSpotifyWebPlaybackSDKReady = () => {
//     player = new Spotify.Player({
//       name: 'Web Playback SDK Quick Start Player',
//       getOAuthToken: cb => { cb(conn.token); },
//       volume: 0.5
//     });
//     // Ready
//     player.addListener('ready', ({ device_id }) => {
//       console.log('Ready with Device ID', device_id);
//     });
//     // Not Ready
//     player.addListener('not_ready', ({ device_id }) => {
//       console.log('Device ID has gone offline', device_id);
//     });
//     player.addListener('initialization_error', ({ message }) => {
//       console.error(message);
//     });
//     player.addListener('authentication_error', ({ message }) => {
//       console.error(message);
//     });
//     player.addListener('account_error', ({ message }) => {
//       console.error(message);
//     });
//     // connect to our spotify instance
//     player.connect();
</script>

<template>
  <div @click="changeLoginStatus" class="absolute top-5 right-5 h-16 w-16">
    <HAvatar url="/profile-picture-5.jpg"> </HAvatar>
  </div>
  <div
    class="flex flex-col items-center justify-center space-y-3s bg-primary-300 min-h-screen"
  >
    <img
      class="rounded-full w-96 h-96, flex justify-center, align-middle"
      :src="`${IMAGE_URL}hitstar.jpg`"
      alt="image description"
    />

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
</template>
