
<script setup lang="ts" >
import HAvatar from './HAvatar.vue';


defineProps<{
    player: {
        name:string,
        icon:string,
    }
}>()



</script>

<template>

<div  class="relative">

<HAvatar :url="player.icon"> </HAvatar>
<!-- draw avater  -->
<span
class="absolute bottom-0 left-8 transform translate-y-1/4 w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full">
</span>
<span class="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6">
{{ player.name }}                  
</span>

</div>



</template>