<script setup lang="ts">
import HButton from "../components/HButton.vue";
import SearchInput from "../components/SearchInput.vue";
import { ref } from 'vue'; // Import ref from Vue
import {  codeChallenge, codeVerifier } from '../authUtils.ts'; // Import codeVerifier and codeChallenge
import { generateRandomString } from "../authUtils.ts";

const clientId = 'b7fbf387ec2346fe810dea140d435788';
const redirectUri = 'http://localhost:5173/';
const scope = 'user-read-private user-read-email';

localStorage.setItem('code_verifier', codeVerifier);
// Define isLoggedIn ref
const isLoggedIn = ref(false);

const login = () => {
  const authUrl = new URL('https://accounts.spotify.com/authorize');
  const params = {
  response_type: 'code',
  client_id: clientId,
  scope,
  code_challenge_method: 'S256',
  code_challenge: codeChallenge,
  redirect_uri: redirectUri,
};


authUrl.search = new URLSearchParams(params).toString();

// Store the code verifier locally
// Redirect user to authorization URL
window.location.href = authUrl.toString();
};
</script>




<template>

<div class="container ">
  <SearchInput> </SearchInput>

  <div>
    <HButton @click="login" > Authorization code   </HButton>
  </div>

</div>
</template>

