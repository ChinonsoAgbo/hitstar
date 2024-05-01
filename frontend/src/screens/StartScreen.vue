<script setup lang="ts">
import HButton from "../components/HButton.vue";
import HAvatar from "../components/HAvatar.vue";
import { ref } from "vue";
import { clientId,  getLocalToken, redirectToAuthCodeFlow } from "../spotifyAPIAUTH/todos.ts";
import { fetchUserPlaylist } from "../spotifyAPIAUTH/playlist.ts";
import { fetchUserProfile } from "../spotifyAPIAUTH/profile.ts";
import { fetchSerch, play, searchTerm } from "../spotifyAPIAUTH/search.ts";

const isLoggedIn = ref(true);


let token;
// parse the URL to retrieve the code parameter
const code = new URLSearchParams(window.location.search).get('code'); // get access code 
const error = new URLSearchParams(window.location.search).get('error') // get acees denied 
// console.log(code)
if (!code) {
  redirectToAuthCodeFlow(clientId); // make sure the user accepts 
} else if (code) { //  fetch token


  getLocalToken(clientId, code).then((accessToken) => {
    console.log("Access Token", accessToken)

    token = accessToken
    //console.log("token:" + token)
    fetchUserProfile(token!).then((value) => {
      console.log(value)
    });

    fetchUserPlaylist(token!).then((value) => {
      console.log(value)
    });

    fetchSerch(token!,"Sam smit").then((value) => {
      console.log("seachFetch:  ",value)

      console.log("body",searchTerm.uri)

      // call play here to see 
      play(token!,searchTerm.uri!).then((value) => {
      console.log("player:  ",value)

      console.log("body",searchTerm.uri)

    });
    });

  }).catch(error => {
    console.error("Error fetching access token:", error);

  });


} else {
  console.error(error);
}



</script>


<template>
  <div @click="" class="absolute top-5 right-5 h-16 w-16">
    <HAvatar url="/profile-picture-5.jpg"> </HAvatar>
  </div>
  <div class="flex flex-col items-center justify-center space-y-3s bg-primary-300 min-h-screen">
    <img class="rounded-full w-96 h-96, flex justify-center, align-middle" src="/hitstar.jpg" alt="image description" />

    <div class="items-center space-y-3 grid-cols-2 gap-4">
      <RouterLink v-show="!isLoggedIn" to="/login">
        <HButton class="lg:m-5 m-10">Log in</HButton>
      </RouterLink>

      <RouterLink v-show="!isLoggedIn" to="/register">
        <HButton class="lg:m-5 m-10">Register</HButton>
      </RouterLink>
      <div class="items-center space-y-3 gap-4">
        <RouterLink v-show="isLoggedIn" to="/qr-code">
          <HButton>Start game</HButton>
        </RouterLink>
      </div>
    </div>
    <RouterLink to="/">
      <HButton class="lg:m-5 m-10">Game instructions</HButton>
    </RouterLink>
  </div>


</template>
