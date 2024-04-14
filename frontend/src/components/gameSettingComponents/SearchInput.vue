<script setup>
import { reactive } from 'vue'

const searchTerm = reactive({
  query: '',
  timeout: null,
  results: null
})

const handleSearch = () => {
  clearTimeout(searchTerm.timeout)
  searchTerm.timeout = setTimeout(async () => {
    if (searchTerm.query !== '') {


    } else {
      searchTerm.results = null
    }
  }, 1000)
}

</script>

<template>
  <div>
    <!-- search field -->

    <form>
      <h3 class="mb-5 text-lg font-semibold text-gray-900 dark:text-Grey">Search Playlist </h3>

      <div class="bg-white border border-indigo-600/30 rounded-lg shadow-lg flex items-center">
       
        <i class="fa-solid fa-magnifying-glass p-2 text-indigo-600"></i>
        <input
          type="text"
          placeholder="Search for playlist"
          class="rounded-r-lg p-2 border-0 outline-0 focus:ring-2 focus:ring-indigo-600 ring-inset w-full"
       
          v-model="searchTerm.query"
          @input="handleSearch"
        />
      </div>
    </form>
    <!-- search suggestions -->
    <div class="bg-white my-2 rounded-lg shadow-lg">
        <div   >
          <button
            
            class="px-3 my-2 hover:text-indigo-600 hover:font-bold w-full text-left"
          >
            {{ searchTerm.query }} 
          </button>
        </div>
      
    </div>
  </div>
</template>
