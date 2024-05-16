<script setup lang="ts">
import { ref, computed } from 'vue'
import HSubmitButton from '../components/HSubmitButton.vue'
import HButton from '../components/HButton.vue'
import HCard from '../components/HCard.vue'

const email = ref('')
const password = ref('')

const isFormValid = computed(() => {
  return email.value !== '' && password.value !== ''
})

</script>

<template>
  <div class="bg-neutral">
    <h1 class="mb-5 ml-5 font-bold">Login for your Hitstar account</h1>
    <form class="max-w-sm ml-5">
      <div class="mb-5">
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Username</label>
        <input
            type="email"
            id="email"
            v-model="email"
            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@hitstar.com"
            required
        />
      </div>
      <div class="mb-5">
        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
        <input
            type="password"
            id="password"
            v-model="password"
            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
        />
      </div>
      <p v-if="!isFormValid" class="text-red-500 text-sm mt-1">Please fill all fields.</p>
      <RouterLink to="/start">
        <HSubmitButton :disabled="!isFormValid">Login</HSubmitButton>
      </RouterLink>
    </form>
    <RouterLink to="/start">
      <HButton>Go back to Start Screen</HButton>
    </RouterLink>
    <HCard size=15 :padding='false'>
      <img class="rounded-2xl" src="/hitstar.jpg" alt="" />
    </HCard>
  </div>
</template>
