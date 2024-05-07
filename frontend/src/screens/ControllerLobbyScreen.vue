<script setup lang="ts">
import WaitingGamers from "../components/WaitingGamers.vue";

import HButton from "../components/HButton.vue";
import { useSessionStore } from "../stores/sessionStore";
import { ref, defineProps, computed } from "vue";
import HAvatar from "../components/HAvatar.vue";

import { useRoute } from "vue-router";

const showDropdown = ref(false);
const username = ref("Chinonso Agbo"); // Defined the username variable
const sessionStore = useSessionStore();
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value; // close dropdown button
};
const route = useRoute();
sessionStore.setSessionID(route.params.sessionId.toString());

//  property to invert the value of showDropdown
const invertedShowDropdown = computed(() => !showDropdown.value);
// property to dynamically change the toggle text
const toggleText = computed(() =>
  invertedShowDropdown.value ? "Ready to join" : "Not Ready to join"
);

defineProps({
  toggleDropdown: Function,
  showDropdown: Boolean,
  updateUsername: Function,
});

const updateUsername = () => {
  return username.value;
};

const avatersForSettings = ref([
  {
    name: "Jesus",
    icon: "/image1.jpg",
  },
  {
    name: "Mike",
    icon: "/image3.png",
  },
  {
    name: "Miss Hoy",
    icon: "/image4.png",
  },
]);
console.log(sessionStore.getSessionID());
</script>

<template>
  <h1>Lobby</h1>
  <!-- Logo -->

  <div class="container mx-auto px-5">
    <div class="flex flex-col justify-center">
      <div class="flex">
        <!--  settings/Dropdown button -> meaning the profile picture to be clicked -->
        <button
          @click="toggleDropdown"
          data-dropdown-toggle="dropdown"
          class="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
          type="button"
        >
          <!--        <img class="w-10 h-10 " src="/icons/list.png" alt="">-->

          <HAvatar url="/profile-picture-5.jpg"></HAvatar>
        </button>

        <label class="inline-flex items-center m-6 cursor-pointer">
          <input
            type="checkbox"
            v-model="invertedShowDropdown"
            class="sr-only peer"
            checked
            disabled
          />

          <div
            class="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
          ></div>
          <span
            class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            {{ toggleText }}</span
          >
        </label>

        <!--      Event listener to for profile to toggle Dropdown -->
        <div
          v-show="showDropdown"
          class="absolute mt-24 z-auto text-base list-none bg-white divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
        >
          <!--          inpute field for user name -->
          <div class="px-4 py-3 text-sm text-gray-900 dark:text-white">
            <p class="mb-1">Edit Profile</p>
            <input
              v-model="username"
              @input="updateUsername"
              type="text"
              id="username"
              placeholder="Username needed!"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>

          <!-- List of dropdown avaters for settings  -->
          <div class="flex flex-wrap">
            <div
              v-for="avater in avatersForSettings"
              class="flex items-center me-4"
            >
              <input
                :id="avater.name"
                type="radio"
                value=""
                name="colored-radio"
                class="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                :for="avater.name"
                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                <HAvatar :url="avater.icon"></HAvatar>{{ avater.name }}</label
              >
            </div>
          </div>
        </div>
      </div>

      <!--      Player username label -->
      <div class="pt-0.5 align-text-center">
        {{ username }}
      </div>
    </div>
    <h3
      class="m-10 text-center text-lg font-semibold text-gray-900 dark:text-Grey"
    >
      Wait for Hitstars to join before starting the Game !
    </h3>

    <!-- Joining Icons and List -->

    <div>
      <WaitingGamers> </WaitingGamers>
    </div>

    <!-- End of Joining icons -->

    <!-- Start game button -->

    <div class="relative mt-10 mb-10 z-0 w-full grid grid-flow-col">
      <RouterLink to="/qr-code">
        <HButton class="bg-red-700"> Exit Lobby </HButton>
      </RouterLink>

      <!--                 <HButton class="">  ? </HButton>-->
    </div>
  </div>
</template>
