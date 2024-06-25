<script setup lang="ts">
import { Genre, HButton, RangYearSlider, SearchInput } from "@components/"
import {ref} from 'vue'

interface Genre {
  id: String,
  name: string
}

// Objects of Genre
const genres = ref<Genre[]>([
      {
        id: "rock", name: "Rock"
      },
      {
        id: "metal", name: "Metal"
      },
      {
        id: "electronic", name: "Electronic"
      },

      {
        id: "jazz", name: "Jazz"
      },
      {
        id: "r&b", name: "R&B"
      },
      {
        id: "funk", name: "Funk"
      },
      {
        id: "blues", name: "Blues"
      },
      {
        id: "hipHopRap", name: "HipHop/Rap"
      },
      {
        id: "pop", name: "Pop"
      },
      {
        id: "country", name: "Country"
      },
      {
        id: "Reggae", name: "Soul music"
      },
      {
        id: "classical", name: "Classical"
      },
      {
        id: "afroBeat", name: "Afro Beat"
      },

    ]
);

</script>

<template>
  <div class="bg-primary-300 ">


    <h1>Music configuration</h1>

<!--    <GameLogo></GameLogo>-->


    <!-- <div class="container mx-auto  "> -->

    <div class="  container  flex flex-col gab-4 relative space-y-5   mx-auto min-h-screen   py-6 sm:py-12">
      <div class="">
        <p> Configured music: 0 </p>
      </div>
      <!-- ... -->

      <!-- Search -->
      <div>
        <SearchInput></SearchInput>
      </div>


      <div class="mt-10  mb-10">

        <!-- Genre -->
        <h3 class="mb-5 text-lg font-semibold text-gray-900 dark:text-Grey">Choose Genre </h3>

        <ul class="grid w-full gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">

          <Genre v-for="genre in genres" :genre="genre"></Genre>
        </ul>


      </div>
      <!-- music year -->

      <div>
        <h3 class="mb-5 text-lg font-semibold text-gray-900 dark:text-Grey">Choose music year </h3>

        <RangYearSlider></RangYearSlider>

      </div>

      <!-- Button to submit -->
      <div class="relative mt-10  mb-10 z-0 w-full group grid grid-cols-2 ">
        <RouterLink class="relative mt-10  mb-10 z-0 w-full group grid grid-cols-2 " to="/qr-code">
          <HButton class="bg-red-700 hover:bg-red-800 "> Undo</HButton>
        </RouterLink>

        <RouterLink class="relative mt-10  mb-10 z-0 w-full group grid grid-cols-2 " to="/qr-code">
          <HButton> Save</HButton>
        </RouterLink>


      </div>


    </div>

  </div>

</template>
