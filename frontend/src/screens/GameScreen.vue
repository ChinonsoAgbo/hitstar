<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import HAvatar from '../components/HAvatar.vue';
import HCard from '../components/HCard.vue'
import HPopOver from '../components/HPopOver.vue';
import { VueFlip } from 'vue-flip';
import MusicPlayer from "../components/MusicPlayer.vue";
import { useElementBounding } from '@vueuse/core'
import Tokens from "../components/Tokens.vue";
import {Player, Card} from "../types";
import {QuestionMarkCircleIcon} from "@heroicons/vue/24/outline";
import {GameStateNew} from "../types";

const cardSize = ref(7)


const activeState = ref(GameStateNew.START_GAME);

const players = ref<Player[]>([
    {
        name: "Harry",
        icon: "/profile-picture-5.jpg",
        cards: [],
        tokens: 2
    },
    {
        name: "Hermione",
        icon: "/profile-picture-3.jpg",
        cards: [],
        tokens: 3
    },
    {
        name: "Ron",
        icon: "/profile-picture-2.jpg",
        cards: [],
        tokens: 1
    }
]);
const activePlayerIndex = ref(-1);
const activePlayer = computed(() => activePlayerIndex.value > -1 ? players.value[activePlayerIndex.value] : null);

const cards = ref<Card[]>([
    {
      title: "HITSTAR",
      year: 2024,
      interpreter: "HITSTAR"
    },
    {
      title: "We are the Champions",
      year: 1978,
      interpreter: "Queen"
    },
    {
      title: "Watermelon Sugar",
      year: 2020,
      interpreter: "Harry Styles"
    },
    {
      title: "Hallelujah",
      year: 1648,
      interpreter: "G. F. Händel"
    }
]);
const drawnCard = ref<Card | null>(null);
const insertionIndex = ref(0);

const animationDuration = 30;
const musicPlayDuration = 60000;


const timeline = ref<HTMLDivElement | null>(null);
const timelineBounding = useElementBounding(timeline);

function newTurn() {
    activeState.value = GameStateNew.START_TURN
    activePlayerIndex.value = (activePlayerIndex.value + 1) % players.value.length

    setTimeout(() => {
        activeState.value = GameStateNew.WAIT_FOR_DRAW_CARD
    }, animationDuration)
}

function drawCard() {
    activeState.value = GameStateNew.DRAW_CARD
    drawnCard.value = cards.value[Math.floor(Math.random() * cards.value.length)];

    setTimeout(() => {
        activeState.value = GameStateNew.CARD_DREW
    }, 1000);
}

function showSongMenu() {
    activeState.value = GameStateNew.SHOW_SONG_MENU
}


function startSorting() {
    activeState.value = GameStateNew.SORT_CARD
    insertionIndex.value = Math.floor(activePlayer.value?.cards.length / 2)
    console.log(insertionIndex.value)
}

function stepRight() {
  insertionIndex.value = (insertionIndex.value - 1 + activePlayer.value?.cards.length) % (activePlayer.value?.cards.length + 1)
  console.log(insertionIndex.value)
  timeline.value.style.left = timelineBounding.left.value + 80 + 'px'
}

function stepLeft() {
  insertionIndex.value = (insertionIndex.value + 1) % (activePlayer.value?.cards.length + 1)

  console.log(insertionIndex.value)
  timeline.value.style.left = timelineBounding.left.value - 80 + 'px'
}

function insertCard() {
  if (activeState.value === GameStateNew.SORT_CARD) {
    activePlayer.value?.cards.splice(insertionIndex.value, 0, drawnCard.value!);
    drawnCard.value = null;
    activeState.value = GameStateNew.WAIT_FOR_CARD_SORTED;
    timeline.value.style.left = '10%'
    setTimeout(() => {
      activeState.value = GameStateNew.CARD_SORTED;
    }, 1000);
  }
}

onMounted(() => {
    document.onkeydown = (e) => {
      if (e.key === 'Enter') {
          insertCard()
      } else if (e.key === 'ArrowLeft') {
          stepLeft()
      } else if (e.key === 'ArrowRight') {
          stepRight()
      }
    }
    setTimeout(() => {
        newTurn()
    }, animationDuration)
})
</script>

<template>
    <div class="bg-primary-500 absolute w-full h-full">

        <!-- Spieler -->
        <div class="fixed right-2 top-2">
            <div v-for="player in players" class=" my-2 flex items-center justify-between gap-2" >

                <Tokens :amount="player.tokens" />

                <h5 v-if="player === activePlayer" class="text-lg font-bold dark:text-gray-900 text-white text-center">{{ player.name }}</h5>
                <h5 v-else class="text-md dark:text-gray-900 text-white text-center">{{ player.name }}</h5>

                <HAvatar v-if="player === activePlayer" :active="true" :size="4" :url="player.icon" />
                <HAvatar v-else :size="3" :url="player.icon" />
            </div>
        </div>

        <!-- Zeitstrahl -->
        <div ref="timeline" class="fixed top-[30%] left-[2%] w-[96%] h-[40%] flex items-center justify-center overflow-x-auto">

          <div class="relative h-min grid grid-cols-10 gap-2">
            <HCard v-for="_ in 10" :size="cardSize" class="bg-transparent border-dashed border-slate-400 flex justify-center items-center">
              <QuestionMarkCircleIcon class="w-8 h-8 text-slate-400" />
            </HCard>
          </div>

          <HCard
                v-for="card in activePlayer?.cards" 
                :size="cardSize">
                <h5 class="text-md text-gray-900 dark:text-white text-center">{{ card.title }}</h5>
                <h1 class="text-3xl font-bold tracking-tight text-center">{{ card.year }}</h1>
                <h5 class="text-md text-gray-900 dark:text- text-center">{{ card.interpreter }}</h5>
            </HCard>
        </div>

        <!-- Aktuelle Karte -->
        <div
            v-if="activeState >= GameStateNew.CARD_DREW && activeState <= GameStateNew.SORT_CARD"
            @click="showSongMenu()"
            class="fixed bottom-4 left-0 w-full flex justify-center"
            :class="[activeState === GameStateNew.SORT_CARD ? 'animate-pulse' : '']">

            <HCard :size="cardSize" :padding="false" class="">
                <img class="rounded-xl" :style="`height: ${cardSize-0.5}em`" src="../../public/hitstar.jpg" alt="" />
            </HCard>
        </div>

        <!-- Gezogene Karte -->
        <div v-if="activeState === GameStateNew.DRAW_CARD" class="fixed bottom-4 left-0 w-full flex justify-center">
            <Transition appear name="draw">
                <HCard :size="cardSize" :padding="false" class="relative">
                    <img class="rounded-xl" :style="`height: ${cardSize-0.5}em`" src="../../public/hitstar.jpg" alt="" />
                </HCard>
            </Transition>
        </div>

        <!-- Ablagestapel -->
        <div class="fixed top-4 left-4 hover:cursor-pointer grayscale" @click="drawCard()">
          <HCard :size="cardSize" :padding="false">
            <img class="rounded-xl" :style="`height: ${cardSize-0.5}em`" src="../../public/hitstar.jpg" alt="" />
          </HCard>
        </div>

        <!-- Nachziehstapel -->
        <div class="fixed top-4 left-36 hover:cursor-pointer" @click="drawCard()">
            <HCard :size="cardSize" :padding="false" :class="[activeState === GameStateNew.WAIT_FOR_DRAW_CARD ? 'animate-pulse' : '']">
                <img class="rounded-xl" :style="`height: ${cardSize-0.5}em`" src="../../public/hitstar.jpg" alt="" />
            </HCard>
        </div>

        <!-- v-if="activeState === GameCycle.NEW_GAME || activeState === GameCycle.NEW_TURN" -->
        <HPopOver v-if="
            activeState === GameStateNew.START_GAME ||
            activeState === GameStateNew.START_TURN ||
            activeState == GameStateNew.SHOW_SONG_MENU
        ">
            <div v-if="activeState === GameStateNew.START_TURN">
                <Transition name="pop" appear>
                    <div class="flex flex-col justify-center items-center gap-3">
                        <HAvatar 
                            :active="true" 
                            :size="cardSize"
                            :url="activePlayer?.icon!" />

                        <h1 class="text-5xl font-bold tracking-tight text-white">
                            {{ activePlayer?.name }}
                        </h1>
                    </div>
                </Transition>
            </div>
            <div v-if="activeState === GameStateNew.START_GAME">
                <Transition name="pop" appear>
                    <h1 class="text-5xl font-bold tracking-tight text-white">
                      New Game!
                    </h1>
                </Transition>
            </div>
            <div v-if="activeState === GameStateNew.SHOW_SONG_MENU" class="w-full h-full flex justify-center items-center">
                <Transition name="pop" appear>
                    <MusicPlayer :time-delta="musicPlayDuration" @finished="startSorting()" />
                </Transition>
            </div>
        </HPopOver>

    </div>
</template>

<style scoped>
.pop-enter-active {
  animation: bounce-in 0.5s;
}
.pop-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}

.draw-leave-active, .draw-enter-active {
   animation: slide-in 1s ease;
 }
 @keyframes slide-in {
    0% {
        left: -50%;
    }
    100% {
        left: 0;
    }
 }
</style>