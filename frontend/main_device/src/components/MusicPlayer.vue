<script setup lang="ts">
// import { PauseIcon, PlayIcon, ArrowPathIcon } from "@heroicons/vue/24/outline";
import { onMounted, ref, watch } from 'vue'
import { useAnimate } from '@vueuse/core'
// @ts-ignore
// import { useSound } from '@vueuse/sound'
// import song from '@assets/music/sound.mp3'
import { useSpotifyStore } from "@stores/spotifyStore";

const props = withDefaults(defineProps<{
  timeDelta: number,
  trackUri: string
}>(),{timeDelta: 30});

// const isLoading = ref(true);
const bar = ref()
const animation = useAnimate(
    bar,
    [
        { width: '0%' },
        { width: '100%' }
    ],
    props.timeDelta
)
const spotifyStore = useSpotifyStore();

const emit = defineEmits<{
  (event: 'finished'): void
}>();

onMounted(() => {
  playTrack(props.trackUri)
  console.log("trackUri", props.trackUri)
  setTimeout(() => { 
    pauseTrack()
  },props.timeDelta)
})

watch(animation.playState, () => {
  if (animation.playState.value === 'finished') {
    emit('finished')
  }
})


const playTrack= ((trackUri:string)=>{
  spotifyStore.playTrack(trackUri)
  animation.play();
})

const pauseTrack= (()=>{
  spotifyStore.pauseTrack()
  animation.pause();
})
</script>

<template>
  <div class="w-80 h-20 p-2 flex flex-col justify-center items-center">
    <div class="w-full h-6 bg-gray-200 rounded-full dark:bg-gray-700">
        <div ref="bar" class="h-6 bg-primary-600 rounded-full dark:bg-primary-500"></div>
    </div>
  </div>
</template>