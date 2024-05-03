<script setup lang="ts">
import { ref, watch, Ref } from 'vue';
import HAvatar from '../components/HAvatar.vue';
import HCard from '../components/HCard.vue'
import Tokens from "../components/Tokens.vue";
import { useGameStore } from "../stores/gameStore.ts";
import HHitstarCard from "../components/HHitstarCard.vue";
import HSongCard from "../components/HSongCard.vue";
import { GameStateNew } from "../types";
import { useAnimate } from "@vueuse/core";
import HPopOver from '../components/HPopOver.vue';
import { VueFlip } from 'vue-flip';
import ConfettiExplosion from "vue-confetti-explosion";

const cardSize = ref(7);

const gameStore = useGameStore();

// mock players
gameStore.players = [
    {
        id: "a",
        name: "Harry",
        iconURL: "/profile-picture-5.jpg",
        cards: [
            {
                id: "10",
                title: "HITSTAR",
                year: 1960,
                interpreter: "HITSTAR",
                position: 5
            }
        ],
        tokens: 3
    },
    {
        id: "b",
        name: "Hermione",
        iconURL: "/profile-picture-3.jpg",
        cards: [
            {
                id: "11",
                title: "HITSTAR",
                year: 1980,
                interpreter: "HITSTAR",
                position: 5
            }
        ],
        tokens: 3
    },
    {
        id: "c",
        name: "Ron",
        iconURL: "/profile-picture-2.jpg",
        cards: [
            {
                id: "12",
                title: "HITSTAR",
                year: 1910,
                interpreter: "HITSTAR",
                position: 5
            }
        ],
        tokens: 3
    }
];

gameStore.drawPile = [
  {
    id: "1",
    title: "HITSTAR",
    year: 1920,
    interpreter: "HITSTAR",
    position: 0,
  },
  {
    id: "2",
    title: "HITSTAR",
    year: 1921,
    interpreter: "HITSTAR",
    position: 0,
  },
  {
    id: "3",
    title: "HITSTAR",
    year: 1922,
    interpreter: "HITSTAR",
    position: 0,
  },
  {
    id: "4",
    title: "HITSTAR",
    year: 1950,
    interpreter: "HITSTAR",
    position: 0,
  },
  {
    id: "5",
    title: "HITSTAR",
    year: 1951,
    interpreter: "HITSTAR",
    position: 0,
  },
  {
    id: "6",
    title: "HITSTAR",
    year: 1952,
    interpreter: "HITSTAR",
    position: 0,
  },
  {
    id: "7",
    title: "HITSTAR",
    year: 1970,
    interpreter: "HITSTAR",
    position: 0,
  },
  {
    id: "8",
    title: "HITSTAR",
    year: 1971,
    interpreter: "HITSTAR",
    position: 0,
  },
  {
    id: "9",
    title: "HITSTAR",
    year: 1972,
    interpreter: "HITSTAR",
    position: 0,
  },
];

const drawPile = ref(null);
const discardPile = ref(null);

function popMinimize(ref: Ref<any>) {
    return useAnimate(
        ref,
        [
            { transform: 'scale(1)' },
            { transform: 'scale(2)' },
            { transform: 'scale(1)' }
        ],
        {
          immediate: false,
          duration: 500
        }
    );
}

// function popMaximize(ref: Ref<any>) {
//     return useAnimate(
//         ref,
//         [
//             { transform: 'scale(0)' },
//             { transform: 'scale(1.2)' },
//             { transform: 'scale(1)' }
//         ],
//         {
//           immediate: false,
//           duration: 500
//         }
//     );
// }

const drawPilePulse = popMinimize(drawPile);
const flip = ref(false);


watch(() => gameStore.activeGameState, () => {
  switch (gameStore.activeGameState) {
    case GameStateNew.DRAWCARD:
      console.log("DRAW CARD 2");
      drawPilePulse.play();
      break;
    case GameStateNew.ANIMATE_EVALUATION_POSITIVE:
      setTimeout(() => {
        flip.value = true;
      }, 500);
      break;
    case GameStateNew.ANIMATE_EVALUATION_NEGATIVE:
      setTimeout(() => {
        flip.value = true;
      }, 500);
      break;
    case GameStateNew.TURNEND:
      flip.value = false;
      break;
  }
});
</script>

<template>
    <div class="bg-primary-500 absolute w-full h-full">

        <!-- Players at top right corner -->
        <div class="fixed right-2 top-2 grid" :style="{ 'grid-template-columns': `repeat(${gameStore.players.length}, 1fr)` }">
            <div 
                v-for="player in gameStore.players" 
                class="m-2 gap-2 flex flex-col items-center border-2 p-1 pt-3 rounded-md" 
                :class="player === gameStore.activePlayer ? 'border-secondary-500 animate-pulse' : 'border-gray-400'" >

                <HAvatar :active="player === gameStore.activePlayer" :size="3" :url="player.iconURL" />
                <Tokens :amount="player.tokens" />
                <h5 v-if="player === gameStore.activePlayer" class="text-lg font-bold dark:text-gray-900 text-white text-center">{{ player.name }}</h5>
                <h5 v-else class="text-md dark:text-gray-900 text-white text-center">{{ player.name }}</h5>
            </div>
        </div>

        <!-- Timeline -->
        <div ref="timeline" class="fixed top-[50%] left-[2%] w-[96%] h-[40%] flex items-center justify-center overflow-x-auto">
          <div class="relative h-min grid grid-cols-10 gap-2">
            <HCard v-for="position in 10" :size="cardSize" class="bg-transparent border-dashed border-slate-400 flex justify-center items-center">
              <HSongCard v-if="gameStore.hasCard(position) && gameStore.getCard(position)?.title !== 'GUESS'" :size="cardSize" :card="gameStore.getCard(position)!" />
              <HHitstarCard v-else-if="gameStore.hasCard(position) && gameStore.getCard(position)?.title === 'GUESS'" :size="cardSize" />
            </HCard>
            <HCard v-for="position in 10" :size="cardSize" class="bg-transparent border-transparent flex justify-center items-center">
              <HHitstarCard v-if="gameStore.activeGameState === GameStateNew.GUESS && position == gameStore.guessedCardIndex" :size="cardSize" class="mt-10 animate-bounce" />
            </HCard>
          </div>
        </div>

        <!-- Ablagestapel -->
        <div class="fixed top-4 left-4 hover:cursor-pointer grayscale">
          <HHitstarCard ref="discardPile" :size="cardSize" />
        </div>

        <!-- Nachziehstapel -->
        <div class="fixed top-4 left-36 hover:cursor-pointer" :class="{ 'animate-pulse': gameStore.activeGameState === GameStateNew.TURNSTART }">
            <HHitstarCard ref="drawPile" :size="cardSize" />
        </div>

        
        <HPopOver v-if="
            gameStore.activeGameState === GameStateNew.ANIMATE_GAMESTART ||
            gameStore.activeGameState === GameStateNew.ANIMATE_TURNSTART ||
            gameStore.activeGameState === GameStateNew.WAIT_FOR_DOUBT ||
            gameStore.activeGameState === GameStateNew.ANIMATE_EVALUATION ||
            gameStore.activeGameState === GameStateNew.ANIMATE_EVALUATION_POSITIVE ||
            gameStore.activeGameState === GameStateNew.ANIMATE_EVALUATION_NEGATIVE
        ">

            <!-- GAME_START ANIMATION -->
            <div v-if="gameStore.activeGameState === GameStateNew.ANIMATE_GAMESTART">
                <Transition name="pop" appear>
                    <h1 class="text-5xl font-bold tracking-tight text-white">
                      New Game!
                    </h1>
                </Transition>
            </div>

            <!-- TURN_START ANIMATION -->
            <div v-if="gameStore.activeGameState === GameStateNew.ANIMATE_TURNSTART">
                <Transition name="pop" appear>
                    <div class="flex flex-col justify-center items-center gap-3">
                        <HAvatar
                            :active="true"
                            :size="cardSize"
                            :url="gameStore.activePlayer?.iconURL!" />

                        <h1 class="text-5xl font-bold tracking-tight text-white">
                            {{ gameStore.activePlayer?.name }}'s Turn
                        </h1>
                    </div>
                </Transition>
            </div>

             <!-- WAIT FOR DOUBT ANIMATION -->
             <div v-if="gameStore.activeGameState === GameStateNew.WAIT_FOR_DOUBT">
                <Transition name="pop" appear>
                  <h1 class="text-6xl font-bold tracking-tight text-white">
                    {{ gameStore.doubtCountDown }}
                  </h1>
                </Transition>
            </div>

             <!-- EVALUATE ANIMATION -->
             <div v-if="gameStore.activeGameState === GameStateNew.ANIMATE_EVALUATION">
                <Transition name="pop" appear>
                  <h1 class="text-8xl font-bold tracking-tight text-white">
                    🤔???
                  </h1>
                </Transition>
            </div>

            <!-- POSITIVE EVALUATE ANIMATION -->
            <div v-if="gameStore.activeGameState === GameStateNew.ANIMATE_EVALUATION_POSITIVE">
              <ConfettiExplosion :duration="5000" :stageHeight="8000" :stageWidth="5000" :particleCount="500"/>
              <Transition name="pop" appear>
                <VueFlip v-model="flip" width="248px" height="248px">
                  <template #front>
                    <HHitstarCard :size="16" />
                  </template>
                  <template #back>
                    <HSongCard :size="16" :card="gameStore.currentCard" />
                  </template>
                </VueFlip>
              </Transition>
            </div>

            <!-- NEGATIVE EVALUATE ANIMATION -->
            <div v-if="gameStore.activeGameState === GameStateNew.ANIMATE_EVALUATION_NEGATIVE">
              <Transition name="pop" appear>
                <VueFlip v-model="flip" width="248px" height="248px">
                  <template #front>
                    <HHitstarCard :size="16" />
                  </template>
                  <template #back>
                    <HSongCard :size="16" :card="gameStore.currentCard" />
                  </template>
                </VueFlip>
              </Transition>
            </div>

            <!-- <div v-if="activeState === GameStateNew.SHOW_SONG_MENU" class="w-full h-full flex justify-center items-center">
                <Transition name="pop" appear>
                    <MusicPlayer :time-delta="musicPlayDuration" @finished="startSorting()" />
                </Transition>
            </div> -->
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