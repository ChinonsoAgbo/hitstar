

<script setup lang="ts">
import { ref, watch, computed } from 'vue';

const minYear = ref(1960);
const maxYear = ref(2024);
const minRange = ref(1960);
const maxRange = ref(2024);

const yearGap = 3; // Adjust as needed

const leftRange = computed(() => ((minRange.value - 1960) / (2024 - 1960)) * 100 + "%");
const rightRange = computed(() => 100 - ((maxRange.value - 1960) / (2024 - 1960)) * 100 + "%");

// update the selected min and max year when input changes
function updateYear() {
  if ((maxYear.value -minYear.value >= yearGap) && maxYear.value <= maxRange.value) {
    minRange.value = minYear.value;
    maxRange.value = maxYear.value;
  }
}

// Function to update the range slider when range input changes
function updateRange() {
  if ((maxRange.value - minRange.value) < yearGap) {
    minRange.value = maxRange.value - yearGap;
  } else {
    minYear.value = minRange.value;
    maxYear.value = maxRange.value;
  }
}
// Watch for changes in min and max range and update the slider accordingly
watch([minRange, maxRange], ([minVal, maxVal]) => {
  const range = document.querySelector(".slider .progress");
  if (range) {
    range.style.left = leftRange.value;
    range.style.right = rightRange.value;
  }
});
</script>



<template>
    <div class="wrapper">
            <!-- Inputs for minimum and maximum year -->
      <div class="price-input">
        <div class="field">
          <span>Min-Year</span>
                  <!-- Input for minimum year with two-way data binding -->
          <input disabled type="number" v-model="minYear" @input="updateYear">
        </div>
        <div class="separator">-</div>
        <div class="field">
          <span>Max-Year</span>
          <input disabled type="number" v-model="maxYear" @input="updateYear">
        </div>
      </div>

      
      <div class="slider">
        <div class="progress" :style="{ left: leftRange, right: rightRange }"></div>
      </div>
      <div class="range-input">
        <input type="range" class="range-min" min="1960" max="2024" v-model="minRange" @input="updateRange">
        <input type="range" class="range-max" min="1960" max="2024" v-model="maxRange" @input="updateRange">
      </div>
    </div>
  </template>
  
