<script setup lang="ts">
import { ref, computed } from 'vue'
import HLoginForm from '../components/HLoginForm.vue'
import HSubmitButton from '../components/HSubmitButton.vue'
import HButton from '../components/HButton.vue'
import HCard from '../components/HCard.vue'

const password = ref('')

const isPasswordEmpty = computed(() => {
  return password.value === ''
})
</script>

<template>
  <div class="bg-neutral">
    <h1 class="mb-5 ml-5 font-bold">Login for your Hitstar account</h1>
    <HLoginForm>Login</HLoginForm>
    <div class="mb-5 max-w-sm ml-5">
      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
      <input
          type="password"
          id="password"
          v-model="password"
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          required
      />
    </div>
    <RouterLink to="/start">
      <HButton>Go back to Start Screen</HButton>
    </RouterLink>
    <RouterLink to="/start">
      <HSubmitButton :disabled="isPasswordEmpty">Login</HSubmitButton>
    </RouterLink>
    <HCard size=15 :padding='false'>
      <img class="rounded-2xl" src="/hitstar.jpg" alt="" />
    </HCard>
  </div>
</template>
