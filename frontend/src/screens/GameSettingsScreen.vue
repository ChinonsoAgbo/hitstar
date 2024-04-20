<script setup>
import SearchInput from "../components/gameSettingComponents/SearchInput.vue"
import Genre from "../components/gameSettingComponents/Genre.vue"
import MusicYear from "../components/gameSettingComponents/MusicYear.vue"

import GameLogo from "/src/components/GameLogo.vue"
import HButton from "../components/HButton.vue";
import RangYearSlider from "../components/gameSettingComponents/RangYearSlider.vue";

</script>

<template>
    <div class="bg-primary-300 ">


        <h1>Music configuration</h1>

        <GameLogo> </GameLogo>



        <!-- <div class="container mx-auto  "> -->

        <div class="  container  flex flex-col gab-4 relative space-y-5   mx-auto min-h-screen   py-6 sm:py-12">
            <div class="" > <p> Configured music: 0 </p> </div>
            <!-- ... -->

            <!-- Search -->
            <div>
               <SearchInput> </SearchInput>
            </div>


            <div class="mt-10  mb-10">

                <!-- Genre -->
                <Genre> </Genre>
            </div>
            <!-- music year -->

            <div>
                <h3 class="mb-5 text-lg font-semibold text-gray-900 dark:text-Grey">Choose music year </h3>

                <RangYearSlider> </RangYearSlider>

            </div>

            <!-- Button to submit -->
            <div class="relative mt-10  mb-10 z-0 w-full group grid grid-cols-2 ">


                <RouterLink class="relative mt-10  mb-10 z-0 w-full group grid grid-cols-2 " to="/qr-code">

                    <HButton class="bg-red-700 hover:bg-red-800 "> Undo </HButton>
                </RouterLink>
                <RouterLink class="relative mt-10  mb-10 z-0 w-full group grid grid-cols-2 " to="/qr-code">

                    <HButton> Save </HButton>
                </RouterLink>



            </div>



        </div>

    </div>

</template>
