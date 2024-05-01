<script setup lang="ts">
import HButton from "../components/HButton.vue";
import SearchInput from "../components/SearchInput.vue";
import {  clientId, codeChallenge, codeVerifier, redirectUri, scope } from '../spotifyAPIAUTH/authUtils.ts'; // Import codeVerifier and codeChallenge



localStorage.setItem('code_verifier', codeVerifier);
const authUrl = new URL('https://accounts.spotify.com/authorize');



const login = () => {
  const params = {
  response_type: 'code',
  client_id:clientId,
  scope,
  code_challenge_method: 'S256',
  code_challenge: codeChallenge,
  redirect_uri: redirectUri,
};

// Redirect user to authorization URL
authUrl.search = new URLSearchParams(params).toString(); // the code is found in the url 
// Store the code verifier locally

window.location.href = authUrl.toString();
};
</script>




<template>

<div class="container ">
 <SearchInput></SearchInput>

  <div>
    <HButton @click="login" > Authorization code   </HButton>
  </div>

</div>
</template>

