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
import HHeading from "../components/HHeading.vue";
import { PauseIcon } from '@heroicons/vue/24/outline';

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
            },
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
                position: 1
            },
            {
                id: "11",
                title: "HITSTAR",
                year: 1970,
                interpreter: "HITSTAR",
                position: 2
            },
            {
                id: "12",
                title: "HITSTAR",
                year: 1980,
                interpreter: "HITSTAR",
                position: 3
            },
            {
                id: "13",
                title: "HITSTAR",
                year: 1990,
                interpreter: "HITSTAR",
                position: 4
            },
            {
                id: "14",
                title: "HITSTAR",
                year: 1993,
                interpreter: "HITSTAR",
                position: 6
            },
            {
                id: "15",
                title: "HITSTAR",
                year: 2000,
                interpreter: "HITSTAR",
                position: 7
            },
            {
                id: "16",
                title: "HITSTAR",
                year: 2002,
                interpreter: "HITSTAR",
                position: 8
            },
            {
                id: "17",
                title: "HITSTAR",
                year: 2016,
                interpreter: "HITSTAR",
                position: 9
            },
            {
                id: "18",
                title: "HITSTAR",
                year: 2018,
                interpreter: "HITSTAR",
                position: 10
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

const drawPile = ref<HTMLElement>();
const discardPile = ref<HTMLElement>();

function popMinimize(ref: Ref<HTMLElement>) {
    return useAnimate(
        ref,
        [
            { transform: 'scale(1)' },
            { transform: 'scale(2)' },
            { transform: 'scale(1)' }
        ],
        {
          immediate: false,
          duration: gameStore.DRAW_CARD_DURATION
        }
    );
}

const drawPilePulse = popMinimize(drawPile as Ref<HTMLElement>);

const flip = ref(false);
const popLeft = ref(false);
const popRight = ref(false);

watch(() => gameStore.activeGameState, () => {
  switch (gameStore.activeGameState) {
    case GameStateNew.DRAWCARD:
      console.log("DRAW CARD 2");
      drawPilePulse.play();
      break;
    case GameStateNew.ANIMATE_EVALUATION_POSITIVE:
      setTimeout(() => {
        flip.value = true;
      }, 2000);
      break;
    case GameStateNew.ANIMATE_EVALUATION_NEGATIVE:
      setTimeout(() => {
        flip.value = true;
        setTimeout(() => {
          popLeft.value = true;
          setTimeout(() => {
            popRight.value = true;
          }, 500);
        }, 500);
      }, 2000);
      break;
    case GameStateNew.TURNEND:
      flip.value = false;
      popLeft.value = false;
      popRight.value = false;
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
            gameStore.activeGameState === GameStateNew.LISTEN ||
            gameStore.activeGameState === GameStateNew.WAIT_FOR_DOUBT ||
            gameStore.activeGameState === GameStateNew.ANIMATE_EVALUATION ||
            gameStore.activeGameState === GameStateNew.ANIMATE_EVALUATION_POSITIVE ||
            gameStore.activeGameState === GameStateNew.ANIMATE_EVALUATION_NEGATIVE ||
            gameStore.activeGameState === GameStateNew.GAMEEND
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

             <!-- LISTEN ANIMATION -->
             <div v-if="gameStore.activeGameState === GameStateNew.LISTEN">
                <HHeading class="fixed bottom-[20%] left-[20%] text-9xl animate-ping">🎵</HHeading>
                <Transition name="pop" appear>
                  <div class="flex flex-col justify-center items-center gap-3">
                    <HHitstarCard :size="16" />
                    <div class="w-24 h-24 flex justify-center items-center bg-white rounded-lg border-4 border-primary-500">
                        <PauseIcon class="w-20 h-20 cursor-pointer font-bold" />
                    </div>
                  </div>
                </Transition>            
                <HHeading class="fixed top-[20%] right-[20%] text-9xl animate-bounce">🎶</HHeading>
            </div>

             <!-- WAIT FOR DOUBT ANIMATION -->
             <div v-if="gameStore.activeGameState === GameStateNew.WAIT_FOR_DOUBT">
                <Transition name="pop" appear>
                  <HHeading v-if="gameStore.doubtCountDown == 0">Doubt-Phase 😮🤢😈</HHeading>
                  <HHeading v-else-if="gameStore.doubtCountDown == 1">1</HHeading>
                  <HHeading v-else-if="gameStore.doubtCountDown == 2">2</HHeading>
                  <HHeading v-else-if="gameStore.doubtCountDown == 3">3</HHeading>
                  <HHeading v-else-if="gameStore.doubtCountDown == 4">4</HHeading>
                  <HHeading v-else-if="gameStore.doubtCountDown == 5">5</HHeading>
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
              <ConfettiExplosion v-if="flip" :duration="5000" :stageHeight="8000" :stageWidth="5000" :particleCount="500"/>
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
                  <HHeading v-if="popLeft" class="fixed top-[30%] left-[30%] text-9xl">☠️</HHeading>
                </Transition>
            
                <Transition name="pop" appear>
                  <VueFlip v-model="flip" width="248px" height="248px"  >
                    <template #front>
                      <HHitstarCard :size="16" />
                    </template>
                    <template #back>
                      <Transition name="getgray" appear>
                        <HSongCard :size="16" :card="gameStore.currentCard" />
                      </Transition>
                    </template>
                  </VueFlip>
                </Transition>
             
                <Transition name="pop" appear>
                  <HHeading v-if="popRight" class="fixed bottom-[30%] right-[30%] text-9xl">🤬</HHeading>
                </Transition>
            </div>

             <!-- GAME_END ANIMATION -->
             <div v-if="gameStore.activeGameState === GameStateNew.GAMEEND">
                <Transition name="pop" appear>
                    <h1 class="text-5xl font-bold tracking-tight text-white">
                      Game finished!
                    </h1>
                </Transition>
            </div>

        </HPopOver>

    </div>
</template>

<style scoped>
.pop-enter-active {
  animation: bounce-in 0.5s;
}
/* .pop-leave-active {
  animation: bounce-in 0.5s reverse;
} */
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

.getgray-enter-active {
  animation: getgray 5s;
}

@keyframes getgray {
  0% {
    filter: grayscale(0);
  }
  100% {
    filter: grayscale(1);
  }
}
</style>