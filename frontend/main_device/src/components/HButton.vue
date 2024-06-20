<template>
    <button 
        :type="type"
        @click="clickSound.play()"
        class="h-16 focus:outline-none hover:scale-105 transition duration-300 ease-in-out text-white bg-gradient-to-r from-orange-500 to-blue-800 hover:bg-primary-900 focus:ring-4 \
              focus:ring-primary-400 font-medium rounded-lg text-lg px-5 py-2.5 mb-2 dark:bg-primary-600 \
              dark:hover:bg-primary-700 dark:focus:ring-primary-900 disabled:from-coolGray-300 disabled:to-blueGray-600 disabled:cursor-not-allowed">
            <slot />
        </button>
</template>

<script setup lang="ts">
import {SOUND_URL} from "@shared/urls";

withDefaults(defineProps<{type?: 'button' | 'submit' | 'reset'}>(), { type: 'button' });

const clickSound = new Audio(`${SOUND_URL}click.mp3`);
</script>