import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useSpotifyStore = defineStore('spotify', () => {
  // STATE
  const is_active = ref(false);
  const is_paused = ref(false);
  const player = ref({});
  const current_track = ref({});
  const token = ref('')

  // ACTIONS
  const setActive = (newValue:any) => {
    is_active.value = newValue;
  };
  const setPaused = (newValue:any) => {
    is_paused.value = newValue;
  };
  const setPlayer = (newValue:any) => {
    player.value = newValue;
  };
  const setTrack = (newValue:any) => {
    current_track.value = newValue;
  };
  const setToken = (newValue:any) => {
    token.value = newValue;
  };

  return { token, setToken,  is_active, is_paused, player, current_track, setActive, setPaused, setPlayer, setTrack };
});
