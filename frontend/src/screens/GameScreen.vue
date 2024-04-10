<script setup lang="ts">
import HButton from '../components/HButton.vue'
import HCard from '../components/HCard.vue'
</script>

<template>
<h1>Game</h1>
<RouterLink to="/start">
    <HButton>Start</HButton>
</RouterLink>

<RouterLink to="/qr-code">
    <HButton class="lg:m-5 m-10">QR-Code</HButton>
</RouterLink>

<HCard></HCard>
</template>