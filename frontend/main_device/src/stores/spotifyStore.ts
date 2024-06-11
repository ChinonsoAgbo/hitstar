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

  type Playlist = {
    id: string;
    name: string;
    tracks: {
      href: string;
      total: number;
      items?: [];
    };
  };



  const authUrl = new URL('https://accounts.spotify.com/authorize');
  // change me 
  const clientId = 'cb69f868494a44b595d41b78992f3c2f'; // your spotify client id here 

  // const redirectUri = 'http://localhost:5173/';
  const redirectUri = 'http://localhost:5173/'; 
  const scope = [
    'playlist-read-private',
    'user-read-email',
    'user-read-playback-state',
    'user-modify-playback-state',
    'streaming',
    'app-remote-control',
    'playlist-read-private',
    'playlist-read-collaborative',
    'playlist-modify-private',
    'playlist-modify-public',
    'user-read-private'
  ];

  /**
   * Redirects user to spotify server for authorization
   */
  async function redirectToAuthCodeFlow() {
    const verifierCode = generateRandomString(64);
    //code challenge generation
    const hashed = await sha256(verifierCode);
    const codeChallenge = base64encode(hashed);

    localStorage.setItem('verifier', verifierCode);

    const params: any = {
      response_type: 'code',
      client_id: clientId,
      scope,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
      redirect_uri: redirectUri,
    };
    authUrl.search = new URLSearchParams(params).toString(); // the code is found in the url 
    // Store the code verifier locally
    window.location.href = authUrl.toString();
  };

  // a high-entropy cryptographic random string for authentication
  const generateRandomString = (length: number): string => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const randomValues = crypto.getRandomValues(new Uint8Array(length)); // return the crypto object associated to the global obj
    return Array.from(randomValues)
      .map((x) => possible[x % possible.length])
      .join('');
  };

  //  Encodes an ArrayBuffer into a base64 string.
  const base64encode = (input: ArrayBuffer): string => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  };

  const sha256 = async (plain: string): Promise<ArrayBuffer> => {
    const encoder = new TextEncoder()
    const data = encoder.encode(plain)
    return await crypto.subtle.digest('SHA-256', data);
  };

  async function getAccessToken(code: string): Promise<any> {

    console.log(" func to fetch new token was called  ")
    const verifierCode = localStorage.getItem("verifier") // get the verifier code 
    let tokenTimestamp = Date.now().toString();

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", redirectUri);
    params.append("code_verifier", verifierCode!);


    const result = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params
    });
    if (!result.ok) {
      const errormessage = await result.text();
      console.log(errormessage)

      // cannot fetch token so redirect 
      redirectToAuthCodeFlow()
    }

    const { access_token, token_type, expires_in, refresh_token } = await result.json();
    // save access token in local 
    localStorage.setItem('accessToken', access_token);
    localStorage.setItem('tokenType', token_type);
    localStorage.setItem('expiresIn', expires_in);
    localStorage.setItem('refreshToken', refresh_token);
    localStorage.setItem('tokenTimestamp', tokenTimestamp);

    return access_token
  }

  async function getRefreshToken(code: string): Promise<any> {
    console.log(" func to refresh token was called  ")
    const refreshToken = localStorage.getItem('refreshToken');
    const url = "https://accounts.spotify.com/api/token";

    let tokenTimestamp = Date.now().toString();

    const params = new URLSearchParams();
    params.append("grant_type", "refresh_token");
    params.append("refresh_token", refreshToken!);
    params.append("client_id", clientId);

    const result = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params
    });
    if (!result.ok) {
      console.log(" there was a proble refreshing token so fetched new one ")
      // in calse of problem refreshing th token just fetch new one 
      return await getAccessToken(code)
    }

    const { access_token, token_type, expires_in, refresh_token } = await result.json();
    // local 
    localStorage.setItem('accessToken', access_token);
    localStorage.setItem('tokenType', token_type);
    localStorage.setItem('expiresIn', expires_in);
    localStorage.setItem('refreshToken', refresh_token);
    localStorage.setItem('tokenTimestamp', tokenTimestamp);
    return access_token

  }

  //Retrieves a local access token, either by refreshing an existing token or obtaining a new one.
  async function getLocalToken(code: string): Promise<any> {

    let tokenTimestamp = localStorage.getItem('tokenTimestamp');
    console.log("checkTimeStamp " + isTokenExpired(tokenTimestamp!))

    if (tokenTimestamp === null || isTokenExpired(tokenTimestamp)) {
      return await getAccessToken(code)
    } else {
      return await getRefreshToken(code)
    }
  }
  // check if tokem is expired 
  const isTokenExpired = (tokenTimestamp: string) => {
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    const tokenExpiryTime = parseInt(tokenTimestamp) + 3600; // Token expiry time in seconds (1 hour)
    return currentTime >= tokenExpiryTime;
  };

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




  const cache: {
    playlists?: Playlist;
    tracks: Map<string, []>;
  } = { tracks: new Map() };


  /**
   *  Fetches tracks for a specific playlist. 
   * This is needed to filter out the Tracks in a playlist 
   * @param tracksUrl 
   * @returns list of tracks
   */
  async function fetchTracksInPlaylist(tracksUrl: string): Promise<any[]> {

    if (cache.tracks.has(tracksUrl)) {
      return cache.tracks.get(tracksUrl) || [];
    }

    let tracks: any = [];
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

      const data: any = await result.json();
      tracks.push(...data.items.map((item: any) => item.track));
      nextUrl = data.next;
    }

    cache.tracks.set(tracksUrl, tracks);

    return tracks;
  }

  /**
   * fetches the hitstar default playlists 
   * @returns Playlist tracks
   */
  async function fetchHitstarDefaultTracks(): Promise<any[]> {

    if (cache.playlists) {
      const playlist = cache.playlists;
      const allTracks = [];

      const tracksUrl = playlist.tracks.href;
      const tracks = await fetchTracksInPlaylist(tracksUrl);
      allTracks.push(...tracks);


      return allTracks;
    }

    if (!token.value) {
      console.error('No token or userId available');
      return [];
    }

    const playlistId = "2qk5rCLoI8KrvtnKI54THE"; // example hitstar default 
    try {
      const url = `https://api.spotify.com/v1/playlists/${playlistId}`;
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

      const defaultPlaylist: Playlist = await result.json();
      console.log("playlist", defaultPlaylist)

      cache.playlists = defaultPlaylist;

      const allTracks = []; // For tracks in a playlist
      const tracksUrl = defaultPlaylist.tracks.href;
      const tracks = await fetchTracksInPlaylist(tracksUrl);
      allTracks.push(...tracks);

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


  /**
   * Fetches and prepares the Hiistar track, 
   * @returns converts them into card objects 
   */
  async function loadHitstarTracks(): Promise<Card[]> {
    try {

      const fetchedTracks = await fetchHitstarDefaultTracks();
      const shuffledTracks = shuffleArray(fetchedTracks);   // Shuffle the fetched tracks 
      const slicedTracks = shuffledTracks.slice(0, 151);  // limit the size 

      const cards: Card[] = slicedTracks.map((track, index) => {  // Transform the sliced tracks into Card objects
        const album = track.album || {}; // Check if track.album exists and is not null
        const trackURI = `spotify:track:${track.id}`;
        return {
          id: track.id,
          title: track.name,
          year: album.release_date || 'Unknown', // Use 'Unknown' if release_date is null
          interpreter: track.artists[0]?.name || 'Unknown Artist',
          position: index + 1, // Position in the list, 1-based
          trackUri: trackURI
        };
      });

      return cards;
    } catch (error) {
      console.error('Error fetching hitstar track ', error);
      throw error;
    }
  }

  /**
   * Use this methode to play a track 
   * @param uri using this func requires u to call the HitstarTrack func and iterate the list to pass the uri 
   * @returns 
   */
  const playTrack = async (uri: string) => {
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


  const pauseTrack = async () => {
    try {
      if (!token.value) {
        console.error('No token available');
        return;
      }

      await fetch(`https://api.spotify.com/v1/me/player/pause`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token.value}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('Playback paused.');
    } catch (error) {
      console.error('Error pausing track:', error);
    }
  };

  return {
    token,
    setToken,
    loadHitstarTracks,
    playTrack,
    redirectToAuthCodeFlow,
    getLocalToken,
    pauseTrack,
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