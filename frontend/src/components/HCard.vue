<script setup lang="ts">
// import { ref } from 'vue';
// import { VueFlip } from 'vue-flip';

withDefaults(defineProps<{
    size: number,
    padding?: boolean
}>(), {
    padding: true
});

// const opened = ref(false)
</script>

<template>
    <!-- <vue-flip active-click class="w-80 h-80"> -->
        <!-- <template #front>
        <img class="rounded-2xl w-80 h-80" src="../public/hitstar.jpg" alt="" />
        </template> -->
        <!-- <template #back> -->

            <div
                :style="{ width: size + 'em', height: size + 'em', padding: padding ? '1.25rem' : '0rem' }"
                class="flex-col bg-secondary-500 border-primary-700 border-4 rounded-2xl">
                <img class="rounded-2xl" src="/hitstar.jpg" alt="" />
                <slot />
            </div>
        <!-- </template> -->
    <!-- </vue-flip> -->

</template>