<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import HAvatar from '../components/HAvatar.vue';
import HCard from '../components/HCard.vue'
import HPopOver from '../components/HPopOver.vue';
import { VueFlip } from 'vue-flip';
import { PlayIcon } from '@heroicons/vue/24/outline'

interface Card {
    title: string,
    year: number,
    interpreter: string
}

interface Player {
    name: string,
    icon: string,
    cards: Card[]
}

enum GameCycle {
    NEW_GAME, 
    NEW_TURN, 
    WAIT_FOR_DRAWING_CARD, 
    DRAW_CARD, 
    CARD_DRAWED, 
    PLAY_CARD_SONG, 
    SORT_CARD
}

const players = ref<Player[]>([
    {
        name: "Harry",
        icon: "../../public/profile-picture-5.jpg",
        cards: []
    },
    {
        name: "Hermione",
        icon: "../../public/profile-picture-3.jpg",
        cards: []
    },
    {
        name: "Ron",
        icon: "../../public/profile-picture-2.jpg",
        cards: []
    }
]);

const activePlayerIndex = ref(-1);
const activePlayer = computed(() => activePlayerIndex.value > -1 ? players.value[activePlayerIndex.value] : null);

const activeState = ref(GameCycle.NEW_GAME);

const timeDelta = 1;
// function newGame() {
//     activeState.value = states[0]
// }

function newTurn() {
    activeState.value = GameCycle.NEW_TURN
    activePlayerIndex.value = (activePlayerIndex.value + 1) % players.value.length

    setTimeout(() => {
        activeState.value = GameCycle.WAIT_FOR_DRAWING_CARD
    }, timeDelta)
}

function drawCard() {
    if (activeState.value !== GameCycle.DRAW_CARD) {
        activeState.value = GameCycle.DRAW_CARD
        
    } else {
        activeState.value = GameCycle.WAIT_FOR_DRAWING_CARD
    }
    setTimeout(() => {
        activeState.value = GameCycle.CARD_DRAWED
    }, 1000);
}

onMounted(() => {
    setTimeout(() => {
        newTurn()
    }, timeDelta)
})
</script>

<template>
    <div class="bg-primary-500 absolute w-full h-full">

        <!-- Players -->
        <div class="fixed right-2 top-2">
            <div v-for="player in players" class=" my-2 flex items-center justify-between gap-2" >
                <h5 v-if="player === activePlayer" class="text-lg font-bold dark:text-gray-900 text-white text-center">{{ player.name }}</h5>
                <h5 v-else class="text-md dark:text-gray-900 text-white text-center">{{ player.name }}</h5>

                <HAvatar v-if="player === activePlayer" :active="true" :size="4" :url="player.icon" />
                <HAvatar v-else :size="3" :url="player.icon" />
            </div>
        </div>

        <!-- Zeitstrahl -->
        <div class="fixed top-[30%] left-[10%] w-[80%] h-[40%] flex items-center justify-center gap-2">
            <HCard 
                v-for="card in activePlayer?.cards" 
                :size="10">
                <h5 class="text-md text-gray-900 dark:text-white text-center">{{ card.title }}</h5>
                <h1 class="text-3xl font-bold tracking-tight text-center">{{ card.year }}</h1>
                <h5 class="text-md text-gray-900 dark:text- text-center">{{ card.interpreter }}</h5>
            </HCard>
        </div>

        <!-- Aktuelle Karte -->
        <div v-if="activeState === GameCycle.CARD_DRAWED" class="fixed bottom-4 left-0 w-full flex justify-center">
            <HCard :size="10" :padding="false" class="">
                <img class="rounded-xl h-[9.5em]" src="../../public/hitstar.jpg" alt="" />
            </HCard>
        </div>

        <!-- Gezogene Karte -->
        <div v-if="activeState === GameCycle.DRAW_CARD" class="fixed bottom-4 left-0 w-full flex justify-center">
            <Transition appear name="draw">
                <HCard :size="10" :padding="false" class="relative">
                    <img class="rounded-xl h-[9.5em]" src="../../public/hitstar.jpg" alt="" />
                </HCard>
            </Transition>
        </div>

        <!-- Nachziehstapel -->
        <div class="fixed bottom-4 left-4 hover:cursor-pointer" @click="drawCard()">
            <HCard :size="10" :padding="false" :class="[activeState === GameCycle.WAIT_FOR_DRAWING_CARD ? 'animate-pulse' : '']">
                <img class="rounded-xl h-[9.5em]" src="../../public/hitstar.jpg" alt="" />
            </HCard>
        </div>

        <!-- v-if="activeState === GameCycle.NEW_GAME || activeState === GameCycle.NEW_TURN" -->
        <HPopOver>
            <div v-if="activeState === GameCycle.NEW_TURN">
                <Transition name="pop" appear>
                    <div class="flex flex-col justify-center items-center gap-3">
                        <HAvatar 
                            :active="true" 
                            :size="10" 
                            :url="activePlayer?.icon!" />

                        <h1 class="text-5xl font-bold tracking-tight text-white">
                            {{ activePlayer?.name }}
                        </h1>
                    </div>
                </Transition>
            </div>
            <div v-if="activeState === GameCycle.NEW_GAME">
                <Transition name="pop" appear>
                    <h1 
                        class="text-5xl font-bold tracking-tight text-white">
                    New Game!
                </h1>
                </Transition>
            </div>
            <div class="w-full h-full flex justify-center items-center">
                <Transition name="pop" appear>
                    <div class="w-[30%] h-[30%] bg-white rounded-md">
                        <PlayIcon class="w-full h-full" />
                    </div>
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
        /* transform: translateX(0%); */
    }
    100% {
        left: 0;
        /* transform: translateX(50%); */
    }
 }
</style>