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
      <HAvatar
        class="font-extra-large w-16 h-16 text-gray-600 dark:text-gray-300 rounded-full ring-4 ring-yellow-400 dark:ring-yellow-600 text-lg"
        >HS
        <span class="top-0 left-7 absolute w-3.5 h-3.5 rounded-full"></span>
      </HAvatar>

      <div class="flex-1 min-w-0">
        <p class="text-lg font-large text-gray-900 truncate dark:text-white">
          # 1
        </p>
        <p class="text-lg font-large text-gray-900 truncate dark:text-white">
          Hit Star
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
          <HAvatar
            class="font-medium text-gray-600 dark:text-gray-300 ring-4 ring-stone-400"
            >CA
          </HAvatar>
          <div class="flex-1 min-w-0">
            <p
              class="text-sm font-medium text-gray-900 truncate dark:text-white"
            >
              # 2 Chinonso Agbo with 8 collected cards
            </p>
          </div>
        </div>
      </li>
      <li class="py-3 sm:py-4">
        <div class="flex items-center space-x-4 rtl:space-x-reverse">
          <HAvatar
            class="font-medium text-gray-600 dark:text-gray-300 ring-4 ring-orange-600"
            >CH
          </HAvatar>
          <div class="flex-1 min-w-0">
            <p
              class="text-sm font-medium text-gray-900 truncate dark:text-white"
            >
              # 3 Cornelius Hartmann with 7 collected cards
            </p>
          </div>
        </div>
      </li>
      <li class="py-3 sm:py-4">
        <div class="flex items-center space-x-4 rtl:space-x-reverse">
          <HAvatar class="font-medium text-gray-600 dark:text-gray-300"
            >MW
          </HAvatar>
          <div class="flex-1 min-w-0">
            <p
              class="text-sm font-medium text-gray-900 truncate dark:text-white"
            >
              # 4 Michael Wenninger with 5 collected cards
            </p>
          </div>
        </div>
      </li>
      <li class="pt-3 pb-0 sm:pt-4">
        <div class="flex items-center space-x-4 rtl:space-x-reverse">
          <div class="flex-shrink-0">
            <HAvatar class="font-medium text-gray-600 dark:text-gray-300"
              >SW
            </HAvatar>
          </div>
          <div class="flex-1 min-w-0">
            <p
              class="text-sm font-medium text-gray-900 truncate dark:text-white"
            >
              # 4 Simon Widmann with 5 collected cards
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
