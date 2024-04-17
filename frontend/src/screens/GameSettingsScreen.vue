<script setup>
import SearchInput from "../components/gameSettingComponents/SearchInput.vue"
import Genre from "../components/gameSettingComponents/Genre.vue"
import MusicYear from "../components/gameSettingComponents/MusicYear.vue"

import GameLogo from "/src/components/GameLogo.vue"
import HButton from "../components/HButton.vue";

</script>

<template>
    <h1>Music configuration</h1>

<GameLogo> </GameLogo>



   <!-- <div class="container mx-auto  "> -->

    <div class="  container gab-1 relative    mx-auto  min-h-screen   py-6 sm:py-12">
        <div class=""> </div>
        <!-- ... -->

        <!-- Search -->
        <div>
            <SearchInput />
        </div>


        <div class="mt-10  mb-10">

            <!-- Genre -->
            <Genre> </Genre>
        </div>
        <!-- music year -->
        <div class="grid grid-flow-row ">

            <MusicYear> </MusicYear>
        </div>
        <!-- Button to submit -->
        <div class="relative mt-10  mb-10 z-0 w-full group grid grid-cols-2 auto-cols-max-max">
            <button type="button"
                class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Undo</button>
             
                <button type="button"
                class=" text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>





        </div>



    </div>
  
</template>
