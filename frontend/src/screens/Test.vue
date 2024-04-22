<script setup lang="ts">
import {ref, defineProps, computed} from 'vue';
import HAvatar from "../components/HAvatar.vue";


const showDropdown = ref(false);
const username = ref('Chinonso Agbo'); // Defined the username variable

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value; // close dropdown button
};

// Computed property to invert the value of showDropdown
const invertedShowDropdown = computed(() => !showDropdown.value);

// Computed property to dynamically change the toggle text
const toggleText = computed(() => invertedShowDropdown.value ? 'Ready to join' : 'Not Ready to join');


defineProps({
  toggleDropdown: Function,
  showDropdown: Boolean,
  updateUsername: Function,
});

const updateUsername = () => {

  return username.value
};



const avaterProfiles = ref([
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

</script>


<template>

  <!-- Dropdown menu items -->

  <div class="container mx-auto px-5">

    <div class="flex flex-col  justify-center ">

      <div class="flex">

        <!--  settings/Dropdown button -> meaning the profile picture to be clicked -->
        <button @click="toggleDropdown" data-dropdown-toggle="dropdown"
                class="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
                type="button">
          <!--        <img class="w-10 h-10 " src="/icons/list.png" alt="">-->

          <HAvatar url="/profile-picture-5.jpg"></HAvatar>

        </button>

        <!--      Toggle Tag: To show availability -->

        <!-- Toggle Tag: To show availability -->
        <label class="inline-flex items-center m-6 cursor-pointer">
          <input type="checkbox" v-model="invertedShowDropdown" class="sr-only peer" checked disabled>
          <!-- Bind the checked attribute to the showDropdown variable -->
          <div class="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"> {{toggleText }}</span>
        </label>


        <!--      Event listener to for profile to toggle Dropdown -->
        <div v-show="showDropdown"
             class=" absolute  mt-24 z-auto  text-base list-none bg-white  divide-gray-100 rounded-lg shadow w-44  dark:bg-gray-700">

            <!--          inpute field for user name -->
          <div class="px-4 py-3 text-sm text-gray-900 dark:text-white">
            <p class="mb-1"> Edit Profile </p>
            <input v-model="username" @input="updateUsername" type="text" id="username"
                   placeholder="Username needed!"
                   class="bg-gray-50 border border-gray-300
         text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                   required/>

          </div>

<!--          <ul   class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="avatarButton">-->

<!--            <li v-for="avater in avaterProfiles" >-->

<!--              <input type="radio" :id="avater.name" name="hosting" value="" class="hidden peer" checked />-->
<!--              <label :for="avater.name"-->
<!--                     class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">-->
<!--                <div class="block">-->
<!--                  <div class="w-fit">-->
<!--              &lt;!&ndash;    avater images &ndash;&gt;-->
<!--                    <HAvatar :url="avater.icon"></HAvatar>-->
<!--                  </div>-->
<!--                  <div class="w-full"> {{avater.name}}</div>-->
<!--                </div>-->

<!--              </label>-->
<!--            </li>-->


<!--          </ul>-->

          <div  class="flex flex-wrap">

            <div v-for="avater in avaterProfiles"  class="flex items-center me-4">
              <input :id="avater.name" type="radio" value="" name="colored-radio" class="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
              <label :for="avater.name" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"> <HAvatar :url="avater.icon"></HAvatar>{{avater.name}}</label>
            </div>
          </div>

        </div>


      </div>

<!--      Player username label -->
      <div class=" pt-0.5 align-text-center">
        {{username}}
      </div>

    </div>
  </div>

</template>

