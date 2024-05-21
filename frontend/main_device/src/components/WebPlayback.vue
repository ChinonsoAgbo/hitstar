<template>
  <div class="container">
    <div class="main-wrapper">
      <template v-if="!store.is_active">
        <b>
          Instance not active. Transfer your playback using your Spotify app
        </b>
      </template>
      <template v-else>
        <img
          :src="store.current_track.album.images[0].url"
          class="now-playing__cover"
          alt=""
        />

        <div class="now-playing__side">
          <div class="now-playing__name">{{ store.current_track.name }}</div>
          <div class="now-playing__artist">
            {{ store.current_track.artists[0].name }}
          </div>

          <button class="btn-spotify" @click="store.player.previousTrack()">
            &lt;&lt;
          </button>

          <button class="btn-spotify" @click="store.player.togglePlay()">
            {{ store.is_paused ? 'PLAY' : 'PAUSE' }}
          </button>

          <button class="btn-spotify" @click="store.player.nextTrack()">
            &gt;&gt;
          </button>

           
          <!-- Display the fetched cards and play track on click -->
          <div v-for="card in store.cards" :key="card.id">
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
const store = useSpotifyStore();

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

    store.setPlayer(player);
    // console.log(props.token);

    store.player.addListener('ready', ({ device_id }) => {
      console.log('Ready with Device ID', device_id);
    });

    store.player.addListener('not_ready', ({ device_id }) => {
      console.log('Device ID has gone offline', device_id);
    });

    store.player.addListener('player_state_changed', (state) => {
      if (!state) {
        return;
      }

      store.setTrack(state.track_window.current_track); // hier kannst du playlist checkin g setzen 
      store.setPaused(state.paused);

      store.player.getCurrentState().then((state) => {
        !state ? store.setActive(false) : store.setActive(true);
      });
    });


store.player.connect();
  };
  
 
});

store.histarTracks().then((tracks) => {

console.log("Tracks", tracks);
})


const playSpecificTrack = (uri: string ) => {
  store.playTrack(uri);
};
    
</script>
