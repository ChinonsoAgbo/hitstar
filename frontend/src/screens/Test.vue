<script setup lang="ts">
import HButton from "../components/HButton.vue";
import SearchInput from "../components/SearchInput.vue";


import {  redirectToAuthCodeFlow } from '../spotifyAPIAUTH/todos.ts'

 const clientId = 'b7fbf387ec2346fe810dea140d435788';



</script>




<template>

<div class="container ">
 <SearchInput></SearchInput>

  <div>
    <HButton @click="redirectToAuthCodeFlow(clientId)" > Authorization code   </HButton>
  </div>

</div>
</template>

