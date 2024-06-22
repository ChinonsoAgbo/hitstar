<script setup lang="ts">
import { ref, computed } from 'vue'
import { HSubmitButton, HButton, HCard } from '@components/'
import { IMAGE_URL } from "@shared/urls";
import {useAccountStore} from "@stores/accountStore";
import {ArrowLeftIcon} from "@heroicons/vue/24/solid";
import HInput from "@components/HInput.vue";
import HWarning from "@components/HWarning.vue";

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
    infoText.value='Logged in Successfully.';
    console.log(infoText.value)
    console.log(accountStore.account);
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

    <form class="max-w-sm" @submit.prevent="login">
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

      <HWarning v-if="!isFormValid || infoText !== ''">
        <p v-if="!isFormValid" class="text-red-500 text-lg mt-1">Please fill in all fields.</p>
        <p v-if="infoText !== ''" class="text-blue-500 text-lg mt-1">{{infoText}}</p>
      </HWarning>

      <HButton class="w-full mt-5" type="submit" :disabled="!isFormValid">
        Login
      </HButton>
      <RouterLink v-if="accountStore.loggedIn" to="start">
        <HButton class="w-full mt-5" type="button">
          TO START
        </HButton>
      </RouterLink>

    </form>

  </div>
</template>
