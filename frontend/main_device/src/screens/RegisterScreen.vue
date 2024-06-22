<script setup lang="ts">
import { ref, computed } from 'vue'
import { HSubmitButton, HButton, HCard } from '@components/'
import { IMAGE_URL } from "@shared/urls";
import HInput from "@components/HInput.vue";
import {ArrowLeftIcon} from "@heroicons/vue/24/solid";
import HWarning from "@components/HWarning.vue";

const password = ref('')
const confirmPassword = ref('')
const username = ref('')
const infoText = ref('')
const registered = ref(false)

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
    registered.value=true;
  } catch (error) {
    infoText.value=error.message;
    console.log(error)
  }
}
</script>

<template>

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

      <HWarning v-if="isPasswordMismatch || !isNotEmpty || !hasValidLength || infoText !== ''">
        <p v-if="isPasswordMismatch" class="text-red-500 text-base mt-1">Passwords do not match.</p>
        <p v-if="!isNotEmpty" class="text-red-500 text-base mt-1">Please fill in all fields.</p>
        <p v-if="!hasValidLength" class="text-red-500 text-base mt-1">Password must contain 5 - 50 digits. <br/> Username must contain 3 - 20 digits.</p>
        <p v-if="infoText !== ''" class="text-blue-500 text-base mt-1">{{infoText}}</p>
      </HWarning>
      <HButton v-if="!registered" class="w-full mt-5" type="submit" :disabled="!isNotEmpty || isPasswordMismatch || !hasValidLength">
        REGISTER
      </HButton>
      <RouterLink v-if="registered" to="login">
        <HButton class="w-full mt-5" type="button">
          TO LOGIN
        </HButton>
      </RouterLink>
    </form>

  </div>
</template>

