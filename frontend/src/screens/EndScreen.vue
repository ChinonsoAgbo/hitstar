<script setup lang="ts">
import HButton from "../components/HButton.vue";
import HAvatar from "../components/HAvatar.vue";
</script>

<template>
  <div
    id="tsparticles"
    class="flex flex-col items-center justify-center space-y-3 bg-primary-300 min-h-screen"
  >
    <div class="flex items-center space-x-4 rtl:space-x-reverse">
   
        <HAvatar url="/profile-picture-3.jpg" class= "rounded-full ring-4 ring-yellow-400 dark:ring-yellow-600 text-lg"> </HAvatar>
   

      <div class="flex-1 min-w-0">
        <p class="text-lg font-large text-gray-900 truncate dark:text-white">
          # 1
        </p>
        <p class="text-lg font-large text-gray-900 truncate dark:text-white">
          Hermione
        </p>
      </div>
    </div>
    <p>has won with 10 Cards, congratulations</p>
    <ul
      class="max-w-md justify-left divide-y divide-secondary-900 dark:divide-gray-700"
    >
      <li class="pb-3 sm:pb-4">
        <div class="flex items-center space-x-4 rtl:space-x-reverse">
          <div class="flex-1 min-w-0"></div>
        </div>
      </li>
      <li class="py-3 sm:py-4">
        <div class="flex items-center space-x-4 rtl:space-x-reverse">
          <HAvatar url="/profile-picture-2.jpg" class= "rounded-full ring-4 ring-grey-400 dark:ring-yellow-600 text-lg"> </HAvatar>
          <div class="flex-1 min-w-0">
            <p
              class="text-sm font-medium text-gray-900 truncate dark:text-white"
            >
              # 2 Ron with 8 collected cards
            </p>
          </div>
        </div>
      </li>
      <li class="py-3 sm:py-4">
        <div class="flex items-center space-x-4 rtl:space-x-reverse">
          <HAvatar url="/profile-picture-5.jpg" class= "rounded-full ring-4 ring-yellow-900 dark:ring-yellow-600 text-lg"> </HAvatar>
          <div class="flex-1 min-w-0">
            <p
              class="text-sm font-medium text-gray-900 truncate dark:text-white"
            >
              # 3 Harry with 7 collected cards
            </p>
          </div>
        </div>
      </li>

    </ul>
    <RouterLink to="/start">
      <HButton class="lg:m-5 m-10">Exit</HButton>
    </RouterLink>
  </div>
</template>
