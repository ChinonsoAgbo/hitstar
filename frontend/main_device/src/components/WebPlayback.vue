<template>
  <div class="container">
    <div class="main-wrapper">
      <template v-if="!spotifyStore.is_active">
        <b>
          Instance not active. Transfer your playback using your Spotify app
        </b>
      </template>
      <template v-else>
        <img
          :src="spotifyStore.current_track.album.images[0].url"
          class="now-playing__cover"
          alt=""
        />

        <div class="now-playing__side">
          <div class="now-playing__name">{{ spotifyStore.current_track.name }}</div>
          <div class="now-playing__artist">
            {{ spotifyStore.current_track.artists[0].name }}
          </div>

          <button class="btn-spotify" @click="spotifyStore.player.previousTrack()">
            &lt;&lt;
          </button>

          <button class="btn-spotify" @click="spotifyStore.player.togglePlay()">
            {{ spotifyStore.is_paused ? 'PLAY' : 'PAUSE' }}
          </button>

          <button class="btn-spotify" @click="spotifyStore.player.nextTrack()">
            &gt;&gt;
          </button>

           
          <!-- Display the fetched cards and play track on click -->
          <div v-for="card in spotifyStore.cards" :key="card.id">
            <div>{{ card.title }} by {{ card.interpreter }}</div>
            <button @click="playSpecificTrack(card.uri)"> <p> << Play >></p> </button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang ="ts">
import { onMounted } from 'vue';
import { useSpotifyStore } from "@stores/spotifyStore.ts";

const props = defineProps({
  token: {
    type: String,
    default: '',
  },
});
const spotifyStore = useSpotifyStore();

const script = document.createElement('script');
script.src = 'https://sdk.scdn.co/spotify-player.js';
script.async = true;

document.body.appendChild(script);

onMounted(() => {
 
  window.onSpotifyWebPlaybackSDKReady = () => {
    const player = new window.Spotify.Player({
      name: 'Hitstar Player',
      getOAuthToken: (cb) => {
        cb(props.token);
      //  cb(store.token.value);

      },
      volume: 0.5,
    });

    spotifyStore.setPlayer(player);
    // console.log(props.token);

    spotifyStore.player.addListener('ready', ({ device_id }) => {
      console.log('Ready with Device ID', device_id);
    });

    spotifyStore.player.addListener('not_ready', ({ device_id }) => {
      console.log('Device ID has gone offline', device_id);
    });

    spotifyStore.player.addListener('player_state_changed', (state) => {
      if (!state) {
        return;
      }

      spotifyStore.setTrack(state.track_window.current_track); // hier kannst du playlist checkin g setzen 
      spotifyStore.setPaused(state.paused);

      spotifyStore.player.getCurrentState().then((state) => {
        !state ? spotifyStore.setActive(false) : spotifyStore.setActive(true);
      });
    });


spotifyStore.player.connect();
  };
  
 
});

spotifyStore.histarTracks().then((tracks) => {

console.log("Tracks", tracks);
})


const playSpecificTrack = (uri: string ) => {
  spotifyStore.playTrack(uri);
};
    
</script>
