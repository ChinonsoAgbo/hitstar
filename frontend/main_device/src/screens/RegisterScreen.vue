<script setup lang="ts">
import { ref, computed } from 'vue'
import { HSubmitButton, HButton, HCard } from '@components/'
import { IMAGE_URL } from "@shared/urls";
import HInput from "@components/HInput.vue";
import {ArrowLeftIcon} from "@heroicons/vue/24/solid";

const password = ref('')
const confirmPassword = ref('')
const username = ref('')
const infoText = ref('')

const isPasswordMismatch = computed(() => {
  return confirmPassword.value !== '' && confirmPassword.value !== password.value
})

const isNotEmpty = computed(() => {
  return password.value !== '' && confirmPassword.value !== '' && username.value !== ''
})

const hasValidLength = computed(() => {
  return password.value.length >= 5 && password.value.length <= 40
      && username.value.length >= 3 && username.value.length <= 20
})

async function register() {
  console.log(username.value + ", " + password.value);
  try {
    const response = await fetch('http://localhost:8080/api/auth/signup', {
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
      throw new Error('Registration failed');
    }
    const data = await response.json();
    infoText.value=data.message;
    console.log(infoText.value)
  } catch (error) {
    infoText.value=error.message;
    console.log(error)
  }
}
</script>

<template>


  <div class="fixed top-0 left-0 w-full h-full bg-[url('http://localhost:8081/images/stage.bmp')] bg-center bg-cover"></div>

  <div class="absolute top-[10%] left-[10%] p-5 flex justify-center align-middle rounded-full backdrop-blur-md bg-gradient-to-r from-orange-500 to-blue-800">
    <img class="rounded-full w-96 h-96 flex justify-center align-middle" :src="`${IMAGE_URL}hitstar.jpg`"
         alt="image description" />
  </div>


  <div class="absolute p-5 top-[10%] right-[10%] h-[80%] w-[40%] rounded-lg gap-2 backdrop-blur-md flex flex-col items-stretch justify-center">

    <RouterLink to="/start">
      <HButton class="fixed -top-5 -right-5 flex justify-around items-center">
        <ArrowLeftIcon class="w-8 h-8 mr-5" />
        BACK
      </HButton>
    </RouterLink>

    <form class="max-w-sm" @submit.prevent="register">
      <div class="mb-2">
        <label for="username" class="block mb-2 text-lg font-medium text-white">
          Your Username
        </label>
        <HInput id="username" placeholder="Username..." type="text" v-model="username"/>
      </div>
      <div class="mb-2">
        <label for="password" class="block mb-2 text-lg font-medium text-white">
          Your Password
        </label>
        <HInput id="password" placeholder="Password..." type="password" v-model="password"/>
      </div>
      <div class="mb-2">
        <label for="confirmPassword" class="block mb-2 text-lg font-medium text-white">
          Your Password again
        </label>
        <HInput id="confirmPassword" placeholder="Password..." type="password" v-model="confirmPassword"/>
      </div>

      <p v-if="isPasswordMismatch" class="text-red-500 text-base mt-1">Passwords do not match.</p>
      <p v-if="!isNotEmpty" class="text-red-500 text-base mt-1">Please fill in all fields.</p>
      <p v-if="!hasValidLength" class="text-red-500 text-base mt-1">Password must contain 5 - 50 digits. <br/> Username must contain 3 - 20 digits.</p>
      <p v-if="infoText !== ''" class="text-blue-500 text-base mt-1">{{infoText}}</p>

      <HButton class="w-full mt-5" type="submit" :disabled="!isNotEmpty || isPasswordMismatch || !hasValidLength">
        REGISTER
      </HButton>

    </form>

  </div>

<!--
  <div class="flex flex-col items-center justify-center space-y-3 bg-primary-300 min-h-screen">
    <h1 class="mb-5 text-xl font-bold">Register for Hitstar</h1>
    <div class="flex flex-row space-x-5">
      <form class="max-w-sm" @submit.prevent="register">
        <div class="mb-5">
          <label for="username" class="block mb-2 text-base font-medium text-gray-900 dark:text-white">
            Your Username
          </label>
          <input
              type="text"
              id="username"
              v-model="username"
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 \
                    focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 \
                    dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 \
                    dark:shadow-sm-light"
              placeholder="Max Mustermann"
              required
          />
        </div>
        <div class="mb-5">
          <label for="password" class="block mb-2 text-base font-medium text-gray-900 dark:text-white">Password</label>
          <input
              type="password"
              id="password"
              v-model="password"
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 \
                    focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 \
                    dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
          />
        </div>
        <div class="mb-5">
          <label for="confirm-password" class="block mb-2 text-base font-medium text-gray-900 dark:text-white">
            Repeat Password
          </label>
          <input
              type="password"
              id="confirm-password"
              v-model="confirmPassword"
              :class="{'border-red-500': isPasswordMismatch, 'border-gray-300': !isPasswordMismatch}"
              class="shadow-sm bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 \
                     focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 \
                     dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 \
                     dark:shadow-sm-light"
              required
          />
          <p v-if="isPasswordMismatch" class="text-red-500 text-base mt-1">Passwords do not match.</p>
          <p v-if="!isNotEmpty" class="text-red-500 text-base mt-1">Please fill all fields.</p>
          <p v-if="!hasValidLength" class="text-red-500 text-base mt-1">Password has to have between 5 and 50 digits. Username has to have between 3 and 20 digits.</p>
          <p v-if="infoText !== ''" class="text-blue-500 text-base mt-1">{{infoText}}</p>
        </div>
        <div class="flex justify-between">
          <HSubmitButton
              :disabled="!isNotEmpty || isPasswordMismatch || !hasValidLength"
              :class="{ 'bg-gray-500 hover:bg-gray-500': !isNotEmpty || isPasswordMismatch || !hasValidLength,
              'bg-blue-500 hover:bg-blue-500': isNotEmpty && !isPasswordMismatch && hasValidLength}"
          >Register</HSubmitButton>
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
  -->
</template>

