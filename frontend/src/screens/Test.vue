<script setup lang="ts">
import HButton from "../components/HButton.vue";

import { lobbyMsg } from "../types/index.ts"
import mqtt from "mqtt";

const client = mqtt.connect("ws://localhost:9001");
// Dummy publish player .> to be relaced by the server or qr code functionalitis ????


</script>


<template>

<div class="container ">

  <div>
    
    <HButton @click ="client.publish(lobbyMsg.topic, JSON.stringify(lobbyMsg.message)),{ retain: true }"> join Game </HButton>
  </div>
  
</div>
</template>

