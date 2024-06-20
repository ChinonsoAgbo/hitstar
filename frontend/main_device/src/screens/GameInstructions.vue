<script setup lang="ts">
import { IMAGE_URL } from '@shared/urls';

import { HButton } from "@components/";


</script>

<template>


    <div
        class="relative flex  space-y-4  text-gray-700 min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">


        <!-- <div class="absolute inset-0 bg-[url(/img/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"> </div> -->


        <div
            class="relative  bg-white px-6   pb-8  pt-10 shadow-xl ring-1 ring-gray-900/5  sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
            <div class="mx-auto  max-w-lg">


                <div class="divide-y divide-gray-300/100">
                    <p class="text-2xl  font-semibold"> 1. Stating game: </p>
                    <div class="space-y-6 py-8 text-base leading-7 text-gray-600">
                        <p> To start game you will need to authorize hitstar app access to your spotify app</p>
                        <ul class="space-y-4">
                            <li class="flex items-center">
                                <svg class="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2"
                                    stroke-linecap="round" stroke-linejoin="round">
                                    <circle cx="12" cy="12" r="11" />
                                    <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
                                </svg>
                                <p class="ml-4">
                                    Log into your Spotify account by clicking the 'Spotify login' button in the Hitstar
                                    App. This will grant Hitstar access to play music through your Spotify account.

                                </p>
                            </li>

                            <li class="flex items-center">
                                <svg class="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2"
                                    stroke-linecap="round" stroke-linejoin="round">
                                    <circle cx="12" cy="12" r="11" />
                                    <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
                                </svg>


                                <p class="ml-4">
                                    After authorization, use your Spotify app to connect to the Hitstar player Webplayback by selecting 'Selecting Hitstar Player as device'. <br> This
                                    will enable Hitstar as a web playback option.
                                </p>
                            </li>
                            <li class="flex items-center">
                                <svg class="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2"
                                    stroke-linecap="round" stroke-linejoin="round">
                                    <circle cx="12" cy="12" r="11" />
                                    <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
                                </svg>
                                <p class="ml-4">Start the game by pressing the "Start Game" button, which allows teams
                                    to join by scanning the QR-Code.  </p>
                            </li>
                        </ul>

                    </div>

                </div>
            </div>
            <p>
                <a href="/start" class="text-sky-500 hover:text-sky-600"> &larr; Back to game </a>
            </p>
        </div>



        <div
            class="relative bg-white px-6pt-10 pt-10  pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
            <div class="mx-auto max-w-md">

                <div class="divide-y divide-gray-300/100">
                    <p class="text-2xl  font-semibold"> 2. Joining game: </p>

                    <div class="space-y-6 py-8 text-base leading-7 ">
                        <ul class="space-y-4  ">

                            <li class="">
                                <p> To use your phone as a controller, scan the QR code on the screen. </p>

                            </li>

                            <ol class="ps-5 mt-2 space-y-1 list-disc">

                                <li class=" ">

                                    <p class="ml-4">
                                        There must be at least three players and a maximum of six players to start
                                    the game.

                                    </p>

                                </li>
                                <li>
                                    <p class="ml-4">
                                        When your teammates are ready, start the game!

                                    </p>


                                </li>
                            </ol>



                        </ul>

                    </div>

                </div>
            </div>
            <p>
                <a href="/start" class="text-sky-500 hover:text-sky-600"> &larr; Back to game </a>
            </p>
        </div>




        <div
            class="relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
            <div class="mx-auto max-w-md">

                <div class="divide-y divide-gray-300/100">
                    <p class="text-2xl  font-semibold"> 3. Game Moves</p>

                    <div class="space-y-6 py-8 text-base leading-7 text-gray-600">
                    <img class="w-15" :src="IMAGE_URL+ 'drawCard.png'" alt="" />

                        <ul class="space-y-4  ">


                            <ol class="ps-5 mt-2 space-y-1 list-disc">
                                <li>
                                    <p class="ml-4">
                                        The player whose turn it is draws a card down using their controller.
                                        A song is automatically played on the PC.

                                    </p>

                                </li>
                                <li>
                                    <p class="ml-4">
                                        After 20 seconds, the song stops and the player can place the card on their
                                        timeline (before, after or
                                        between the cards already on display).
                                    </p>

                                </li>
                                <li>
                                    <p class="ml-4">
                                        The goal is to sort the card into the correct position in which the music year was published.
                                    </p>

                                </li>
                               
                            </ol>


                        </ul>
                    </div>
                </div>
            </div>
            <p>
                <a href="/start" class="text-sky-500 hover:text-sky-600"> &larr; Back to game </a>
            </p>
        </div>




        <div
            class="relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
            <div class="mx-auto max-w-md">

                <div class="divide-y divide-gray-300/100">
                    <p class="text-2xl  font-semibold"> 4. Check by other players:</p>

                    <div class="space-y-6 py-8 text-base leading-7 text-gray-600">
                        <p> Doubting phase. </p>
                        <ul class="space-y-4  ">

                            <ol class="ps-5 mt-2 space-y-1 list-disc">
                                <li>
                                    <p class="ml-4">
                                        All other players have 10 seconds to doubt the active player's decision.

                                    </p>

                                </li>
                                <li>
                                    <p class="ml-4">
                                        A doubt can be expressed by other players. <br> If someone doubts the decision, the
                                        face-down card on the active player's timeline changes.
                                    </p>
                                </li>

                            </ol>
                        </ul>
                    </div>
                </div>
            </div>
            <p>
                <a href="/start" class="text-sky-500 hover:text-sky-600"> &larr; Back to game </a>
            </p>
        </div>



  
        <div
            class="relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
            <div class="mx-auto max-w-md">

                <div class="divide-y divide-gray-300/100">
                    <p class="text-2xl  font-semibold"> 5. Revealing card:</p>

                    <div class="space-y-6 py-8 text-base leading-7 text-gray-600">
                        <ul class="space-y-4  ">

                            <li>
                                <p>If the card is revealed and the active player has classified the card correctly, he
                                    receives the card. </p>
                            </li>

                            <ol class="ps-5 mt-2 space-y-1 list-disc">
                                <li>
                                    <p class="ml-4">
                                        If the active player is wrong and the doubting player is right, the doubting
                                        player steals the card and places it on his own timeline.
                                    </p>

                                </li>
                                <li>
                                    <p class="ml-4">
                                        If both are wrong, the card is placed on the discard pile.
                                        Then it is the next player's turn. </p>
                                </li>

                            </ol>
                        </ul>
                    </div>
                </div>
            </div>
            <p>
                <a href="/start" class="text-sky-500 hover:text-sky-600"> &larr; Back to game </a>
            </p>
        </div>




        <div
            class="relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
            <div class="mx-auto max-w-md">

                <div class="divide-y divide-gray-300/100">
                    <p class="text-2xl  font-semibold"> 6. End of Game:</p>

                    <div class="space-y-6 py-8 text-base leading-7 text-gray-600">
                        <p>The first player to have 10 face-up cards on their timeline wins the game. </p>

                    </div>
                </div>
            </div>
            <p>
                <a href="/start" class="text-sky-500 hover:text-sky-600"> &larr; Back to game </a>
            </p>
        </div>


        <div
            class="relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
            <div class="mx-auto max-w-md">

                <div class="divide-y divide-gray-300/100">
                    <p class="text-2xl  font-semibold"> Technical support </p>

                    <div class="space-y-6 py-8 text-base leading-7 text-gray-600">
                        <p>- If a song doesn't play, verify that your Spotify app is connected to 'Hitstar player'. <br>
                            - Make sure you have an active spotify premium subscription. <br>
                           </p>
                        <p>
                            Enjoy playing and organizing your music tracks!</p>

                    </div>
                </div>
            </div>
            <p>
                <a href="/start" class="text-sky-500 hover:text-sky-600"> &larr; Back to game </a>
            </p>
        </div>


    </div>


</template>
