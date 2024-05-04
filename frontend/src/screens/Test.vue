<script setup lang="ts">
import HButton from "../components/HButton.vue";

<<<<<<< HEAD
import { lobbyMsg } from "../types/index.ts"
import mqtt from "mqtt";
=======
import {  redirectToAuthCodeFlow } from '../spotifyAPIAUTH/todos.ts'

 const clientId = 'b7fbf387ec2346fe810dea140d435788';
>>>>>>> spotifyPlayer

const client = mqtt.connect("ws://localhost:9001");
// Dummy publish player .> to be relaced by the server or qr code functionalitis ????


</script>




<template>

<div class="container ">
<<<<<<< HEAD

  <div>
    
    <HButton @click ="client.publish(lobbyMsg.topic, JSON.stringify(lobbyMsg.message)),{ retain: true }"> join Game </HButton>
=======
 <SearchInput></SearchInput>

  <div>
    <HButton @click="redirectToAuthCodeFlow(clientId)" > Authorization code   </HButton>
>>>>>>> spotifyPlayer
  </div>
  
  <div>
    <HButton @click="redirectToAuthCodeFlow(clientId)" > Authorization code   </HButton>
  </div>


</div>
</template>

