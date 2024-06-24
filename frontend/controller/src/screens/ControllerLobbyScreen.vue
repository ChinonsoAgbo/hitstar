<script setup lang="ts">
import { HButton } from "../components/";
import { useSessionStore } from "@shared/stores/sessionStore.ts";
import { ref, defineProps, computed, onMounted } from "vue";
import { watch } from "vue";
import { useRoute } from "vue-router";
import { useControllerStore } from "@stores/controllerStore";
import { router } from "../router";
import { useGameCycleStore } from "@shared/stores/gameCycleStore.ts";
import { GameState } from "@shared/types";
import { IMAGE_URL } from "@shared/urls";
import { ArrowLeftIcon } from "@heroicons/vue/24/solid";

const controllerStore = useControllerStore();
const gameCycle = useGameCycleStore();

const showDropdown = ref(false);
const username = ref(""); // Defined the username variable
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
    icon: "image1.jpg",
  },
  {
    name: "Mike",
    icon: "image3.png",
  },
  {
    name: "Miss Hoy",
    icon: "image4.png",
  },
]);

watch(
  () => gameCycle.activeGameState,
  (newState) => {
    if (newState !== GameState.GAMESTART) {
      router.push("/controller");
    }
  }
);
onMounted(() => {
  controllerStore.addToLobby();
});
const bg_url = ref(`${IMAGE_URL}/stage.jpg`)
</script>

<template>

  <div class="bg-img" :style="{ backgroundImage: 'url(' + bg_url + ')' }"></div>

  <h3 class="fixed top-10 left-0 w-full text-center text-lg font-semibold text-white">
    Wait for <p class="font-bold text-4xl">HITSTARS</p> to join the <p class="font-bold text-4xl">GAME!</p>
  </h3>

  <div class="fixed top-0 left-0 w-full p-5 h-full flex items-center justify-center">
    <div
      class="background-animate p-5 flex justify-center align-middle rounded-full backdrop-blur-md bg-gradient-to-r from-orange-500 to-blue-800">
      <img class="rounded-full animate-pulse flex justify-center align-middle" :src="`${IMAGE_URL}hitstar.jpg`"
        alt="image description" />
    </div>
  </div>

  <!--  <div class="text-2xl">-->
  <!--    {{ username }}-->
  <!--  </div>-->

  <RouterLink to="/">
    <HButton class="fixed bottom-5 m-[5%] left-0 w-[90%] flex justify-around items-center">
      <ArrowLeftIcon class="w-8 h-8 mr-5" />
      EXIT GAME 
    </HButton>
  </RouterLink>

  <!--  <div class="container mx-auto px-5">-->
  <!--    <div class="flex flex-col justify-center">-->
  <!--      <div class="flex">-->
  <!--  settings/Dropdown button -> meaning the profile picture to be clicked -->
  <!--        <button-->
  <!--          @click="toggleDropdown"-->
  <!--          data-dropdown-toggle="dropdown"-->
  <!--          class="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"-->
  <!--          type="button"-->
  <!--        >-->
  <!--        <img class="w-10 h-10 " src="/icons/list.png" alt="">-->

  <!--          <HAvatar url="/profile-picture-5.jpg"></HAvatar>-->
  <!--        </button>-->

  <!--        <label class="inline-flex items-center m-6 cursor-pointer">-->
  <!--          <input-->
  <!--            type="checkbox"-->
  <!--            v-model="invertedShowDropdown"-->
  <!--            class="sr-only peer"-->
  <!--            checked-->
  <!--            disabled-->
  <!--          />-->

  <!--          <div-->
  <!--            class="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"-->
  <!--          ></div>-->
  <!--          <span-->
  <!--            class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"-->
  <!--          >-->
  <!--            {{ toggleText }}</span-->
  <!--          >-->
  <!--        </label>-->

  <!--      Event listener to for profile to toggle Dropdown -->
  <!--        <div-->
  <!--          v-show="showDropdown"-->
  <!--          class="absolute mt-24 z-auto text-base list-none bg-white divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"-->
  <!--        >-->
  <!--          inpute field for user name -->
  <!--          <div class="px-4 py-3 text-sm text-gray-900 dark:text-white">-->
  <!--            <p class="mb-1">Edit Profile</p>-->
  <!--            <input-->
  <!--              v-model="username"-->
  <!--              @input="updateUsername"-->
  <!--              type="text"-->
  <!--              id="username"-->
  <!--              placeholder="Username needed!"-->
  <!--              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"-->
  <!--              required-->
  <!--            />-->
  <!--          </div>-->

  <!--          &lt;!&ndash; List of dropdown avaters for settings  &ndash;&gt;-->
  <!--          <div class="flex flex-wrap">-->
  <!--            <div-->
  <!--              v-for="avater in avatersForSettings"-->
  <!--              class="flex items-center me-4"-->
  <!--            >-->
  <!--              <input-->
  <!--                :id="avater.name"-->
  <!--                type="radio"-->
  <!--                value=""-->
  <!--                name="colored-radio"-->
  <!--                class="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"-->
  <!--              />-->
  <!--              <label-->
  <!--                :for="avater.name"-->
  <!--                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"-->
  <!--              >-->
  <!--                <HAvatar :url="avater.icon"></HAvatar>{{ avater.name }}</label-->
  <!--              >-->
  <!--            </div>-->
  <!--          </div>-->
  <!--        </div>-->
  <!--      </div>-->

  <!--      Player username label -->
  <!--    </div>-->

  <!-- Joining Icons and List -->

  <!--    <div>-->
  <!--      <WaitingGamers> </WaitingGamers>-->
  <!--    </div>-->

  <!-- End of Joining icons -->

  <!-- Start game button -->

  <!--  </div>-->
</template>

<style scoped>
.bg-img {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>