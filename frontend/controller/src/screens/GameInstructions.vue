<script setup lang="ts">
import { IMAGE_URL } from '@shared/urls';
import { router } from '../router'

</script>



<template>


    <div
        class="relative flex  space-y-4  text-gray-700 min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">


        <!-- <div class="absolute inset-0 bg-[url(/img/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"> </div> -->


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
            <p @click="router.push('/controller')" class="text-sky-500 hover:text-sky-600 cursor-pointer"> &larr; Back
                to controller

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
            <p @click="router.push('/controller')" class="text-sky-500 hover:text-sky-600 cursor-pointer"> &larr; Back
                to controller

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
            <p @click="router.push('/controller')" class="text-sky-500 hover:text-sky-600 cursor-pointer"> &larr; Back
                to controller

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
            <p @click="router.push('/controller')" class="text-sky-500 hover:text-sky-600 cursor-pointer"> &larr; Back
                to controller

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
            <p @click="router.push('/controller')" class="text-sky-500 hover:text-sky-600 cursor-pointer"> &larr; Back
                to controller

            </p>
        </div>

    </div>


</template>