import { ref } from 'vue';
import { defineStore } from 'pinia';
import { Card } from '@shared/types';

export const useSpotifyStore = defineStore('spotify', () => {

  // STATE
  const is_active = ref(false);
  const is_paused = ref(false);
  const player = ref({});
  const current_track = ref({});
  const token = ref('')
  const cards = ref<Card[]>([]);  // list histar cards 

  interface Artist {
    external_urls: { spotify: string };
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
  }

  interface Image {
    url: string;
    height: number | null;
    width: number | null;
  }

  interface Track {
    album: {
      album_type: string;
      artists: Artist[];
      available_markets: string[];
      external_urls: { spotify: string };
      href: string;
      id: string;
      images: Image[];
      name: string;
      release_date: string;
      release_date_precision: string;
      total_tracks: number;
      type: string;
      uri: string;
    };
    artists: Artist[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: { isrc: string };
    external_urls: { spotify: string };
    href: string;
    id: string;
    is_local: boolean;
    name: string;
    popularity: number;
    preview_url: string | null;
    track_number: number;
    type: string;
    uri: string;
  }

  interface TrackItem {
    added_at: string;
    added_by: {
      external_urls: { spotify: string };
      href: string;
      id: string;
      type: string;
      uri: string;
    };
    is_local: boolean;
    primary_color: string | null;
    track: Track;
  }

  interface PlaylistItem {
    description: string;
    external_urls: { spotify: string };
    href: string;
    id: string;
    images: Image[];
    name: string;
    tracks: {
      href: string;
      total: number;
    };
    type: string;
    uri: string;
  }

  interface Playlist {
    href: string;
    items: PlaylistItem[];
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
  }

  // ACTIONS

  // use the Webplayer to set active 
  const setActive = (newValue: any) => { 
    is_active.value = newValue;
  };
  const setPaused = (newValue: any) => {
    is_paused.value = newValue;
  };
  const setPlayer = (newValue: any) => {
    player.value = newValue;
  };
  const setTrack = (newValue: any) => {
    current_track.value = newValue;
  };
  const setToken = (newValue: any) => {
    token.value = newValue;
  };

  
  const cache = { // cache to reduce API calls to spotify 
    playlists: null as Playlist | null,
    tracks: new Map<string, Track[]>(),
  };

  // Fetches tracks for a specific playlist. 
  // This is needed to filter out the Tracks in a playlist 
  async function fetchTracksForPlaylist(tracksUrl: string): Promise<Track[]> {

    if (cache.tracks.has(tracksUrl)) {
      return cache.tracks.get(tracksUrl) || [];
    }

    let tracks: Track[] = [];
    let nextUrl: string | null = tracksUrl;

    while (nextUrl) {
      const result = await fetch(nextUrl, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token.value}`,
          'Content-Type': 'application/json',
        },
      });

      if (!result.ok) {
        throw new Error(`Error fetching tracks: ${result.statusText}`);
      }

      const data:any = await result.json();
      tracks.push(...data.items.map((item: TrackItem) => item.track));
      nextUrl = data.next;
    }

    cache.tracks.set(tracksUrl, tracks);

    return tracks;
  }


  // fetch all tracks in a user playlist 
  async function fetchTracks(): Promise<Track[]> {
    if (cache.playlists) {
      const allTracks: Track[] = [];
      for (const playlist of cache.playlists.items) {
        if (playlist.tracks.total >= 110) {
          const tracksUrl = playlist.tracks.href;
          const tracks = await fetchTracksForPlaylist(tracksUrl);
          allTracks.push(...tracks);
        }
      }
      return allTracks;

    }
    if (!token.value) {
      console.error('No token or userId available');
      return [];
    }

    try {
      const url = `https://api.spotify.com/v1/me/playlists`;
      const result = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token.value}`,
          'Content-Type': 'application/json',
        },
      });

      if (!result.ok) {
        throw new Error(`Error fetching playlists: ${result.statusText}`);
      }

      const userPlaylists: Playlist = await result.json();
      cache.playlists = userPlaylists;

      const allTracks: Track[] = [];
      for (const playlist of userPlaylists.items) {
        //console.log(playlist.tracks.total )
        if (playlist.tracks.total >= 110) {
          const tracksUrl = playlist.tracks.href;

          const tracks = await fetchTracksForPlaylist(tracksUrl);
          allTracks.push(...tracks);
        }
      }

      return allTracks;
    } catch (error) {
      console.error('Error fetching tracks:', error);
      return [];
    }
  }

  // shuffle the track array 
  function shuffleArray(array: any[]) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }


  // Fetches and prepares the Hiistar track, 
  // converts them into card objects 
  async function histarTracks(): Promise<Card[]> {
    try {
     
      const fetchedTracks = await fetchTracks(); // Fetch the tracks 
   
      const shuffledTracks = shuffleArray(fetchedTracks);   // Shuffle the fetched tracks 
      const slicedTracks = shuffledTracks.slice(0, 151);  // limit the size 

     
      const cards: Card[] = slicedTracks.map((track, index) => {  // Transform the sliced tracks into Card objects
        
        const album = track.album || {}; // Check if track.album exists and is not null
        
        console.log("album", album)
        const trackURI = `spotify:track:${track.id}`;
        return {
          id: track.id,
          title: track.name,
          year: album.release_date || 'Unknown', // Use 'Unknown' if release_date is null
          interpreter: track.artists[0]?.name || 'Unknown Artist',
          position: index + 1, // Position in the list, 1-based
          uri: trackURI 
        };
      });
      setCards(cards);
      return cards;
    } catch (error) {
      console.error('Error fetching hitstar track ', error);
      throw error; // Propagate the error
    }
  }

  // Use this methode to play a track 
  // NOTE: that i added a uri in the hitstarTrack to return the uri of each track 
  // using this func requires u to call the HitstarTrack func and iterate the list to pass the uri 
  const playTrack = async (uri: string )=>{
    try {
      if (!token.value) {
        console.error('No token available');
        return;
      }

      await fetch(`https://api.spotify.com/v1/me/player/play`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token.value}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uris: [uri], // Pass the URI of the track to play
        }),
      });
      console.log(`Track ${uri} is now playing.`);
    } catch (error) {
      console.error('Error playing track:', error);
    }
  };
  const setCards = (newCards: Card[]) => {
    cards.value = newCards;
  };
 
  return {
    token,
    setToken, // Set the token
    histarTracks, // Fetch and load the histar cards and tracks
    playTrack, // Play a track (for web playback)
    cards, // Get the music card information
    
    // Web playback states and actions
    is_active,
    is_paused,
    player,
    current_track,
    setActive,
    setPaused,
    setPlayer,
    setTrack,
  };
});