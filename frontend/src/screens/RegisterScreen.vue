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
  <div class="mb-5 max-w-sm ml-5">
    <label for="confirm-password" class="!showPassword block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repeat Password</label>
    <input type="confirm-password" id="confirm-password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
  </div>
<RouterLink to="/start">
    <HButton>Go back to Start Screen</HButton>
</RouterLink>
<RouterLink to="/login">
    <HSubmitButton>Register</HSubmitButton>
</RouterLink>
<HCard size=15 :padding='false'>
  <img class="rounded-2xl" src="/hitstar.jpg" alt="" />
</HCard>
</div>
</template>