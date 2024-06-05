<script setup lang="ts">
import { ref, computed } from 'vue'
import { HSubmitButton, HButton, HCard } from '@components/'
import { IMAGE_URL } from "@shared/urls";
import {useAccountStore} from "@stores/accountStore";

//TODO Ergänzen: Logout-Funktion, Eingabevalidierung (Frontend & Backend)

const username = ref('')
const password = ref('')
const infoText = ref('')

const accountStore = useAccountStore()

const isFormValid = computed(() => {
  return username.value !== '' && password.value !== ''
})

async function login() {
  console.log(username.value + ", " + password.value);
  try {
    const response = await fetch('http://localhost:8080/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }
    const data = await response.json();
    accountStore.setAccount(data.username, data.token);
    infoText.value='Logged in Successfully';
    console.log(infoText.value)
    console.log(accountStore.account);
  } catch (error) {
    infoText.value=error.message;
    console.log(error)
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center space-y-3 bg-primary-300 min-h-screen">
    <h1 class="mb-5 text-xl font-bold">Login for your Hitstar account</h1>
    <div class="flex flex-row space-x-5">
      <form class="max-w-sm" @submit.prevent="login">
        <div class="mb-5">
          <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Your Username
          </label>
          <input
              type="text"
              id="username"
              v-model="username"
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg \
                    focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 \
                    dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 \
                    dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Max Mustermann"
              required
          />
        </div>
        <div class="mb-5">
          <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Your Password
          </label>
          <input
              type="password"
              id="password"
              v-model="password"
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 \
                    focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 \
                    dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 \
                    dark:shadow-sm-light"
              required
          />
        </div>
        <p v-if="!isFormValid" class="text-red-500 text-sm mt-1">Please fill all fields.</p>
        <p v-if="infoText !== ''" class="text-blue-500 text-sm mt-1">{{infoText}}</p>
        <div class="flex justify-between">
          <HSubmitButton
              :disabled="!isFormValid"
              :class="{ 'bg-gray-500 hover:bg-gray-500': !isFormValid, 'bg-blue-500 hover:bg-blue-500': isFormValid }"
          >Login</HSubmitButton>
          <RouterLink to="/start">
            <HButton>Go back to Start Screen</HButton>
          </RouterLink>
        </div>
      </form>
      <HCard size=15 :padding='false'>
        <img class="rounded-2xl" :src="`${IMAGE_URL}hitstar.jpg`" alt="" />
      </HCard>
    </div>
  </div>
</template>
