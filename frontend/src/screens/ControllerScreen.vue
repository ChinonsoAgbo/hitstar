<script setup lang="ts">
import { ref } from 'vue';

const showDropdown = ref(false);

const toggleDropdown = () => {
    showDropdown.value = !showDropdown.value;  // close dropdown button 
};

</script>

<template>
    <div class="container mx-auto mt-7 flex justify-center items-center">
        <!-- Controller card -->
        <div
            class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

            <div class="flex justify-end px-4 pt-4">
                <!-- Link to Game instructions -->
                <a href=""> <img class="w-10 h-10 rounded-full" src="../assets/icons/support.png" alt=""></a>

                <!-- Contoller settings button -->
                <button @click="toggleDropdown" data-dropdown-toggle="dropdown"
                    class="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
                    type="button">
                    <img class="w-10 h-10 " src="../assets/icons/list.png" alt="">
                </button>



                <!-- Dropdown menu items -->
                <div v-show="showDropdown"
                    class=" absolute  mt-10 z-auto  text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">


                    <div class="px-4 py-3 text-sm text-gray-900 dark:text-white">
                        <input type="text" id="first_name"
                            class="bg-gray-50 border border-gray-300
               text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value="Game Username" required />
                    </div>

                    <!-- Avater liste -->
                    <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="avatarButton">
                        <li>
                            <a href="#"
                                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                Smart man <img class="w-10 h-10 rounded-full" src="../assets/image6.jpg" alt="">
                            </a>
                        </li>
                        <li>
                            <a href="#"
                                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                The
                                Devil
                                <img class="w-10 h-10 rounded-full" src="../assets/image3.png" alt="">
                            </a>
                        </li>
                        <li>
                            <a href="#"
                                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings
                                <img class="w-10 h-10 rounded-full" src="../assets/image2.png" alt="">
                            </a>
                        </li>
                    </ul>
                    <!-- Save settings button-->
                    <div class="py-1">
                        <a href="#"
                            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                            Save </a>
                    </div>

                </div>


            </div>

            <div class="flex flex-col items-center pb-10">
                <img class="w-20 h-24 mb-3 rounded-full shadow-lg" src="../assets/image2.png" alt="Game Username" />
                <span class="text-sm text-gray-500 dark:text-gray-400">Game Username</span>

                <!-- Navigation button-->
                <div class="flex mt-4 md:mt-12">
                    <button type="button"
                        class="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-xl px-5 py-4.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
                        <img class="w-10 h-10 rounded-full" src="../assets/icons/back.png" alt=""></button>

                    <button type="button"
                        class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-7 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                        <img class="w-10 h-10 rounded-full" src="../assets/icons/yes.png" alt=""></button>
                    <button type="button"
                        class="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">

                        <img class="w-10 h-10 rounded-full" src="../assets/icons/right.png" alt=""></button>

                </div>
                <!-- Rejection button-->
                <button type="button"
                    class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-10 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                    <img class="w-10 h-10 rounded-full" src="../assets/icons/unlike.png" alt=""></button>
            </div>
        </div>

    </div>
</template>
