<script setup lang="ts">
import HLoginForm from '../components/HLoginForm.vue'
import HSubmitButton from '../components/HSubmitButton.vue'
import HButton from '../components/HButton.vue'
import HCard from '../components/HCard.vue'
</script>

<template>
<div class="bg-neutral">
<h1 class="mb-5 ml-5 font-bold">Register for Hitstar</h1>
<HLoginForm>Registration</HLoginForm>
<RouterLink to="/start">
    <HButton>Go to Start Screen</HButton>
</RouterLink>
<RouterLink to="/login">
    <HButton>Go to Login</HButton>
</RouterLink>
<RouterLink to="/login">
    <HSubmitButton>Register</HSubmitButton>
</RouterLink>
<HCard size=15 :padding='false'></HCard>
</div>
</template>