<script setup lang="ts">
import { ref, defineProps } from 'vue';

import { ChevronLeftIcon } from '@heroicons/vue/24/outline';

const showDropdown = ref(false);
const username = ref('Laddy B'); // Defined the username variable

const toggleDropdown = () => {
    showDropdown.value = !showDropdown.value; // close dropdown button
};


defineProps({
    toggleDropdown: Function,
    showDropdown: Boolean,
    updateUsername: Function,
});

const updateUsername = () => {

    return username.value
};

</script>

<template>
    <div class="container mx-auto mt-7 flex justify-center items-center">

        <!-- Dropdown menu items -->

        <div v-show="showDropdown"
            class=" absolute  mt-10 z-auto  text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">


            <div class="px-4 py-3 text-sm text-gray-900 dark:text-white">
                <p class="mb-1"> Edit Profile </p>
                <input v-model="username" @input="updateUsername" type="text" id="username"
                    placeholder="Username needed!"
                    class="bg-gray-50 border border-gray-300
               text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required />

            </div>

            <!-- Avater liste -->
            <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="avatarButton">

                <li>

                    <input type="radio" id="avater1" name="hosting" value="" class="hidden peer" checked />
                    <label for="avater1"
                        class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <div class="block">
                            <div class="w-fit"> <img class="w-10 h-10 rounded-full" src="../assets/image1.jpg" alt="">
                            </div>
                            <div class="w-full"> Ghost girl </div>
                        </div>

                    </label>
                </li>
                <li>

                    <input type="radio" id="avater2" name="hosting" value="" class="hidden peer" />
                    <label for="avater2"
                        class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <div class="block">
                            <div class="w-fit"> <img class="w-10 h-10 rounded-full" src="../assets/image5.jpg" alt="">
                            </div>
                            <div class="w-full">Smart man </div>
                        </div>

                    </label>
                </li>

                <li>

                    <input type="radio" id="avater3" name="hosting" value="" class="hidden peer" />
                    <label for="avater3"
                        class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <div class="block">
                            <div class="w-fit"> <img class="w-10 h-10 rounded-full" src="../assets/image3.png" alt="">
                            </div>
                            <div class="w-full"> Mad man </div>
                        </div>

                    </label>
                </li>
            </ul>

        </div>


        <!-- Controller card -->
        <div class="w-full max-w-sm   rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

            <!-- Profile and Settings -->
            <div class="grid grid-cols-2 mx-4 mt-2">
                
                <div class="flex justify-start m-3 ">
                    <!-- Link to Game instructions -->
                    <img class="w-12 h-12 mb-3 rounded-full shadow-lg" src="/image1.jpg" alt="Game Username" />
                    <span class="text-sm m-2 text-gray-500 dark:text-gray-400">{{ username }}</span>
                </div>


                <div class="flex justify-end ">
                    <!--  settings/Dropdown button -->
                    <button @click="toggleDropdown" data-dropdown-toggle="dropdown"
                        class="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
                        type="button">
                        <img class="w-10 h-10 " src="/icons/list.png" alt="">
                    </button>

                    
                </div>


                <!-- Link to Game instructions -->
                <a href=""> <img class="w-10 h-10  rounded-full" src="/icons/support.png" alt=""></a>


            </div>




            <div class="flex flex-col items-center w-full py-20 ">

                <!-- Navigation button-->
                <div class="flex mt-4 md:mt-12 sm:mt-12">
                    <button type="button"
                        class=" bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300  rounded-full  px-5 py-5  mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
                        <img class="w-10 h-10 rounded-full" src="../assets/icons/back.png" alt="">
                    
                    </button>

                    <button type="button"
                        class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 rounded-full px-10 py-2.5 mx-3 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                        <img class="w-10 h-10 rounded-full" src="../assets/icons/yes.png" alt=""></button>
                    <button type="button"
                        class="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 rounded-full  px-5 py-5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">

                        <img class="w-10 h-10 rounded-full" src="../assets/icons/right.png" alt=""></button>

                </div>
                <!-- Rejection button-->
                <button type="button"
                    class="bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full  px-20 py-4  pt- dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
            <ChevronLeftIcon class="w-10 h-10 text-slate-200"> </ChevronLeftIcon>
                    <!-- <img class="w-10 h-10 rounded-full" src="../assets/icons/unlike.png" alt=""> -->
                </button>
           
                </div>


                    </div>

    </div>
</template>
