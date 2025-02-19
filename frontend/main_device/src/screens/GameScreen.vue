<script setup lang="ts">
import { HAvatar, HCard, Tokens, HHitstarCard, HSongCard, HPopOver, HHeading, MusicPlayer } from '@components/';
//@ts-ignore
import { VueFlip } from 'vue-flip';
import ConfettiExplosion from "vue-confetti-explosion";
import { BoltIcon } from '@heroicons/vue/24/outline';
import { useAnimate } from "@vueuse/core";
import { ref, watch, Ref, onMounted } from 'vue';
import { useGameStore } from "@stores/gameStore.ts";
import { GameState } from "@shared/types";
import { IMAGE_URL } from "@shared/urls";
import {useGameCycleStore} from "@shared/stores/gameCycleStore.ts";

const cardSize = ref(10);

const gameStore = useGameStore();
const gameCycle = useGameCycleStore();

// mock players
// gameStore.players = 

// gameStore.drawPile = ;

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

watch(() => gameCycle.activeGameState, () => {
  switch (gameCycle.activeGameState) {
    case GameState.DRAWCARD:
      console.log("DRAW CARD 2");
      drawPilePulse.play();
      break;
    case GameState.GUESS:
      flip.value = false;
      popLeft.value = false;
      popRight.value = false;
      break;
    case GameState.DOUBT:
      popLeft.value = true;
      setTimeout(() => {
        popRight.value = true;
        setTimeout(() => {
          flip.value = true;
        }, 1000);
      }, 1000);
      break;
    case GameState.ANIMATE_EVALUATION:
      flip.value = false;
      popLeft.value = false;
      popRight.value = false;
      break;
    case GameState.ANIMATE_EVALUATION_POSITIVE:
      setTimeout(() => {
        flip.value = true;
      }, 2000);
      break;
    case GameState.ANIMATE_EVALUATION_NEGATIVE:
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
    case GameState.TURNEND:
      flip.value = false;
      popLeft.value = false;
      popRight.value = false;
      break;
  }
});
onMounted(() =>{
  gameStore.startGame();
})
</script>

<template>
    <div class="backdrop-blur-2xl absolute w-full h-full">

        <!-- Players at top right corner -->
        <div class="fixed right-2 top-2 grid grid-cols-4">

            <div 
                v-for="player in gameStore.players" 
                class="m-2 gap-2 flex flex-col items-center border-2 p-1 pt-3 rounded-md" 
                :class="[`border-${player.color}-200`, player === gameStore.playerOnTurn ? 'animate-pulse': '']">

                <HAvatar :active="player === gameStore.playerOnTurn" :color="player.color" :size="3" :url="IMAGE_URL + player.iconURL" />
                <Tokens :amount="player.tokens" />
                
                <h5 
                    v-if="player === gameStore.playerOnTurn" 
                    class="text-lg font-bold dark:text-gray-900 text-white text-center">
                    {{ player.name }}
                </h5>
                <h5 
                    v-else 
                    class="text-md dark:text-gray-900 text-white text-center">
                    {{ player.name }}
                </h5>
            </div>
        </div>

        <!-- Big players at middle -->
        <div
            v-if="gameCycle.activeGameState > 0"
            class="fixed left-0 top-[10%] w-full flex items-center justify-center gap-5">
          <HAvatar
              :active="gameCycle.activeGameState !== GameState.MATEGUESS"
              :size="7"
              :color="gameStore.playerOnTurn.color"
              :url="IMAGE_URL + gameStore.playerOnTurn.iconURL" />

          <BoltIcon 
              v-if="gameCycle.activeGameState === GameState.MATEGUESS"
              class="h-20 text-secondary-200" />

          <HAvatar 
              v-if="gameCycle.activeGameState === GameState.MATEGUESS"
              :active="true" 
              :size="7"
              :color="gameStore.activePlayer.color"
              :url="IMAGE_URL + gameStore.activePlayer.iconURL" class="animate-pulse" />

        </div>

        <!-- Timeline -->
        <div 
            ref="timeline" 
            class="fixed top-[40%] left-[2%] w-[96%] h-[55%] flex items-center justify-center overflow-x-auto">
            
            <div class="flex flex-col w-full">

              <div class="p-2 flex min-w-fit items-center justify-center">

                <HCard
                    v-for="card in gameStore.activePlayer.cards"
                    :size="cardSize"
                    class="border-dashed border-slate-400 m-1 flex items-center justify-center content-stretch">

                  <HHitstarCard
                      v-if="card && card.title === 'HITSTAR'"
                      :size="cardSize"
                      :color="gameStore.playerOnTurn.color" />

                    <HSongCard
                        v-else-if="card && card.id !== ''"
                        :size="cardSize"
                        :card="card"
                        :color="gameStore.activePlayer.color"/>

                </HCard>
              </div>

              <div class="p-2 flex min-w-fit items-center justify-center">
                <HCard
                    v-for="card in gameStore.hitstarCards"
                    :size="cardSize"
                    class="border-transparent m-1 flex justify-center items-center">

                    <HHitstarCard
                      v-if="card.title !== ''
                            && (gameCycle.activeGameState === GameState.GUESS
                                || gameCycle.activeGameState === GameState.MATEGUESS)"
                      :size="cardSize"
                      color="primary"
                      class="animate-bounce" />
                  </HCard>
              </div>

          </div>
        </div>

        <!-- Ablagestapel -->
        <div class="fixed top-4 left-4 hover:cursor-pointer grayscale">
          <HHitstarCard ref="discardPile" :size="cardSize - 2" color="primary" />
        </div>

        <!-- Nachziehstapel -->
        <div 
            class="fixed top-4 left-40 hover:cursor-pointer"
            :class="{ 'animate-pulse': gameCycle.activeGameState === GameState.TURNSTART }">
            <HHitstarCard ref="drawPile" :size="cardSize - 2" color="primary" />
        </div>

        
        <HPopOver v-if="
            gameCycle.activeGameState === GameState.ANIMATE_GAMESTART ||
            gameCycle.activeGameState === GameState.ANIMATE_TURNSTART ||
            gameCycle.activeGameState === GameState.LISTEN ||
            gameCycle.activeGameState === GameState.WAIT_FOR_DOUBT ||
            gameCycle.activeGameState === GameState.DOUBT ||
            gameCycle.activeGameState === GameState.ANIMATE_EVALUATION ||
            gameCycle.activeGameState === GameState.ANIMATE_EVALUATION_POSITIVE ||
            gameCycle.activeGameState === GameState.ANIMATE_EVALUATION_NEGATIVE ||
            gameCycle.activeGameState === GameState.GAMEEND
        ">

            <!-- GAME_START ANIMATION -->
            <div v-if="gameCycle.activeGameState === GameState.ANIMATE_GAMESTART">
                <Transition name="pop" appear>
                    <h1 class="text-5xl font-bold tracking-tight text-white">
                      New Game!
                    </h1>
                </Transition>
            </div>

            <!-- TURN_START ANIMATION -->
            <div v-if="gameCycle.activeGameState === GameState.ANIMATE_TURNSTART">
                <Transition name="pop" appear>
                    <div class="flex flex-col justify-center items-center gap-3">
                        <HAvatar
                            :active="true"
                            :size="cardSize"
                            :color="gameStore.playerOnTurn.color"
                            :url="IMAGE_URL + gameStore.playerOnTurn?.iconURL!" />

                        <h1 class="text-5xl font-bold tracking-tight text-white">
                            {{ gameStore.playerOnTurn?.name }}'s Turn
                        </h1>
                    </div>
                </Transition>
            </div>

             <!-- LISTEN ANIMATION -->
             <div v-if="gameCycle.activeGameState === GameState.LISTEN">
                <HHeading class="fixed bottom-[20%] left-[20%] text-9xl animate-ping">🎵</HHeading>
                <Transition name="pop" appear>
                  <div class="flex flex-col justify-center items-center gap-3">
                    <HHitstarCard :size="16" />
                    <!-- <div class="w-24 h-24 flex justify-center items-center bg-white rounded-lg border-4 border-primary-200">
                        <PauseIcon class="w-20 h-20 cursor-pointer font-bold" />
                    </div> -->

                    <MusicPlayer :trackUri="gameStore.currentCard.trackUri" :timeDelta="gameStore.SONG_DURATION" />

                  </div>
                </Transition>            
                <HHeading class="fixed top-[20%] right-[20%] text-9xl animate-bounce">🎶</HHeading>
            </div>

             <!-- WAIT FOR DOUBT ANIMATION -->
             <div v-if="gameCycle.activeGameState === GameState.WAIT_FOR_DOUBT">
                <Transition name="pop" appear>
                  <HHeading v-if="gameStore.doubtCountDown == 0">Doubt-Phase 😮🤢😈</HHeading>
                  <HHeading v-else>{{ gameStore.doubtCountDown }}</HHeading>
                </Transition>
            </div>

            <!-- DOUBT ANIMATION -->
            <div v-if="gameCycle.activeGameState === GameState.DOUBT">
                <Transition name="pop" appear>
                  <HAvatar 
                      v-if="popLeft" 
                      :active="true" 
                      :size="7" 
                      :url="IMAGE_URL + gameStore.playerOnTurn.iconURL"
                      :color="gameStore.playerOnTurn.color"
                      class="fixed top-[30%] left-[30%]" />
                </Transition>
                <Transition name="pop" appear>
                  <BoltIcon v-if="flip" class="h-40 text-secondary-200" />
                </Transition>
                <Transition name="pop" appear>
                  <HAvatar 
                      v-if="popRight" 
                      :active="true" 
                      :size="7" 
                      :url="IMAGE_URL + gameStore.activePlayer.iconURL"
                      :color="gameStore.activePlayer.color"
                      class="fixed bottom-[30%] right-[30%]" />
                </Transition>
            </div>

<!--             &lt;!&ndash; EVALUATE ANIMATION &ndash;&gt;-->
<!--             <div v-if="gameCycle.activeGameState === GameState.ANIMATE_EVALUATION">-->

<!--                <div class="fixed top-[10%] left-0 w-full flex items-center justify-center">-->
<!--                  <HAvatar -->
<!--                    :active="true" -->
<!--                    :size="7"-->
<!--                    :color="gameStore.activePlayer.color"-->
<!--                    :url="IMAGE_URL + gameStore.activePlayer.iconURL" />-->
<!--                </div>-->

<!--                <Transition name="pop" appear>-->
<!--                  <h1 class="text-8xl font-bold tracking-tight text-white">-->
<!--                    🤔???-->
<!--                  </h1>-->
<!--                </Transition>-->
<!--            </div>-->

            <!-- POSITIVE EVALUATE ANIMATION -->
            <div v-if="gameCycle.activeGameState === GameState.ANIMATE_EVALUATION_POSITIVE">

              <div class="fixed top-[10%] left-0 w-full flex items-center justify-center">
                  <HAvatar 
                    :active="true" 
                    :size="7"
                    :color="gameStore.activePlayer.color"
                    :url="IMAGE_URL + gameStore.activePlayer.iconURL" />
              </div>
                

              <ConfettiExplosion 
                  v-if="flip" 
                  :duration="5000" 
                  :stageHeight="8000" 
                  :stageWidth="5000" 
                  :particleCount="199"/>
              <Transition name="pop" appear>
                <VueFlip v-model="flip" width="248px" height="248px">
                  <template #front>
                    <HHitstarCard :size="16" />
                  </template>
                  <template #back>
                    <HSongCard :color="gameStore.activePlayer.color" :size="16" :card="gameStore.currentCard" />
                  </template>
                </VueFlip>
              </Transition>
            </div>

            <!-- NEGATIVE EVALUATE ANIMATION -->
            <div v-if="gameCycle.activeGameState === GameState.ANIMATE_EVALUATION_NEGATIVE">
                <Transition name="pop" appear>
                  <HHeading v-if="popLeft" class="fixed top-[30%] left-[30%] text-9xl">☠️</HHeading>
                </Transition>

                <div class="fixed top-[10%] left-0 w-full flex items-center justify-center">
                  <HAvatar 
                    :active="true" 
                    :size="7"
                    :color="gameStore.activePlayer.color"
                    :url="IMAGE_URL + gameStore.activePlayer.iconURL" />
                </div>
                
                <Transition name="pop" appear>
                  <VueFlip v-model="flip" width="248px" height="248px"  >
                    <template #front>
                      <HHitstarCard :size="16" />
                    </template>
                    <template #back>
                      <Transition name="getgray" appear>
                        <HSongCard :size="16" :color="gameStore.activePlayer.color" :card="gameStore.currentCard" />
                      </Transition>
                    </template>
                  </VueFlip>
                </Transition>
             
                <Transition name="pop" appear>
                  <HHeading v-if="popRight" class="fixed bottom-[30%] right-[30%] text-9xl">🤬</HHeading>
                </Transition>
            </div>

             <!-- GAME_END ANIMATION -->
             <div v-if="gameCycle.activeGameState === GameState.GAMEEND">
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