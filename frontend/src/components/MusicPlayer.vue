<script setup lang="ts">
import {PauseIcon, PlayIcon} from "@heroicons/vue/24/outline";
import {onMounted, ref, watch} from 'vue'
import { useAnimate } from '@vueuse/core'
// import trumpetSfx from '../assets/sounds/fanfare.mp3'

const props = defineProps<{
  timeDelta: number
}>();

const emit = defineEmits<{
  (event: 'finished'): void
}>();
// const sound = useSound(trumpetSfx)
const bar = ref()
const animation = useAnimate(bar, [{ width: '0%' }, { width: '100%' }], props.timeDelta)

watch(animation.playState, () => {
  if (animation.playState.value === 'finished') {
    emit('finished')
  }
})
</script>

<template>
  <div class="w-80 h-80 p-5 bg-white rounded-xl flex flex-col justify-center items-center border-4 border-secondary-500">

    <PauseIcon
        v-if="animation.playState.value === 'running'"
        @click="animation.pause()"
        class="w-20 h-20 cursor-pointer" />

    <PlayIcon
        v-else
        @click="animation.play()"
        class="w-20 h-20 cursor-pointer" />

    <div class="w-full h-6 bg-gray-200 rounded-full dark:bg-gray-700">
        <div ref="bar" class="h-6 bg-primary-600 rounded-full dark:bg-primary-500"></div>
    </div>
  </div>
</template>

<style scoped>
.play-leave-active, .play-enter-active {
  animation: slide-in 5s linear;
}
@keyframes slide-in {
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
}
</style>