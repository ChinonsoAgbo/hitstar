<script setup lang="ts">

</script>

<template>
  <div class="p-2 mt-4 rounded-lg background-animate bg-gradient-to-r from-orange-500 to-blue-800">
    <p class="p-2 bg-black w-full h-full rounded-md">
      <slot></slot>
    </p>
  </div>
</template>

<style scoped>
.background-animate {
  background-size: 400%;
  -webkit-animation: AnimationName 5s ease infinite;
  -moz-animation: AnimationName 5s ease infinite;
  animation: AnimationName 5s ease infinite;
}

@keyframes AnimationName {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}
</style>