<script setup>
import { ref, reactive } from 'vue'

const searchTerm = reactive({
  query: '',
  timeout: null,
  results: []
})

const foundPlaylist = ref([])

const addPlaylist = (playlist) => {
  foundPlaylist.value.push(playlist)
}

const removePlaylist = (index) => {
  foundPlaylist.value.splice(index, 1)
}

const handleSearch = () => {
  clearTimeout(searchTerm.timeout)
  searchTerm.timeout = setTimeout(async () => {
    if (searchTerm.query !== '') {
      // Perform search operation and update searchTerm.results
      searchTerm.results = [
        { name: 'Playlist 1' }, // Example playlist object
        { name: 'Playlist 2' }, // Example playlist object
        // Add more playlists as needed
      ]
    } else {
      searchTerm.results = []
    }
  }, 1000)
}
</script>

<template>
  <div>
    <!-- search field -->
    <form>
      <h3 class="mb-5 text-lg font-semibold text-gray-900 dark:text-Grey">Search Playlist</h3>
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
      <div v-if="searchTerm.results && searchTerm.results.length > 0">
        <ul>
          <li v-for="(playlist, index) in searchTerm.results" :key="index">
            <button @click="addPlaylist(playlist)"
              class="px-3 my-2 hover:text-indigo-600 hover:font-bold w-full text-left"
            >
              {{ playlist.name }}
            </button>
          </li>
        </ul>
      </div>
      <!-- list of selected playlist -->
      <div>
        <ul class="flex flex-wrap space-x-4  text-gray-900 dark:text-white">
          <li v-for="(playlist, index) in foundPlaylist" :key="index">
            <p class="text-blue-600"> {{ playlist.name }} 
            <button @click="removePlaylist(index)"> <p class="text-teal-600">X</p></button></p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
