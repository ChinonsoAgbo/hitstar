<script setup lang="ts">

</script>
<script setup>
import SearchInput from "/src/components/gameSettingComponents/SearchInput.vue"
import Genre from "/src/components/gameSettingComponents/Genre.vue"
import MusicYear from "/src/components/gameSettingComponents/MusicYear.vue"


</script>

<template>
    <h1>Music configuration</h1>

    <div class="  mx-auto  mb-10 ">
        <img class="h-auto w-28" src=" ..\assets\hitstar.jpg
" alt="image description">
    </div>


    <div class="container mx-auto px-30 ">
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
        <div class="grid grid-flow-row auto-rows-max">

            <MusicYear> </MusicYear>
        </div>
        <!-- Button to submit -->


        <div class="relative mt-10  mb-10 z-0 w-full group grid grid-flow-col auto-cols-max-max">
            <button type="button"
                class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Undo</button>

            <button type="button"
                class=" text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
        
        
        
            </div>
    </div>

</template>
