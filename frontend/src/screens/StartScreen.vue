<script setup lang="ts">
import HButton from "../components/HButton.vue";
import HAvatar from "../components/HAvatar.vue";
import { ref } from "vue";
import axios from 'axios'
import querystring from 'querystring';
import { base64encode, codeVerifier, generateCodeChallenge, sha256 } from '../authUtils.ts'; // Import codeVerifier

//const codeVerifier = generateRandomString(64);

const isLoggedIn = ref(true);

const client_id = 'b7fbf387ec2346fe810dea140d435788';
const redirect_uri = 'http://localhost:5173/';

const getToken = async (code: string) => {
    try {
        const formData = new URLSearchParams({
            client_id,
            grant_type: 'authorization_code',
            code,
            redirect_uri,
            // add any additional parameters you need
        });

        const response = await axios.post('https://accounts.spotify.com/api/token', formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        if (response.status === 200) {
            const { access_token, refresh_token, expires_in, token_type, scope } = response.data;
            localStorage.setItem('access_token', access_token);
            localStorage.setItem('refresh_token', refresh_token);
            localStorage.setItem('expires_in', expires_in.toString());
            localStorage.setItem('token_type', token_type);
            localStorage.setItem('scope', scope);

            console.log('Access Token:', access_token);
            return access_token;
        } else {
            console.error('Failed to get access token:', response.data);
            return null;
        }
    } catch (error) {
        console.error('Error getting access token:', error);
        return null;
    }
};

const refreshAccessToken = async ()=> {
    try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) {
            console.error('Refresh token not found');
            return null;
        }
        const formData = new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
            client_id: client_id,
            // add any additional parameters you need
        });

        const response = await axios.post('https://accounts.spotify.com/api/token', formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        if (response.status === 200) {
            const { access_token, refresh_token, expires_in, token_type, scope } = response.data;
            localStorage.setItem('access_token', access_token);
            localStorage.setItem('refresh_token', refresh_token);
            localStorage.setItem('expires_in', expires_in.toString());
            localStorage.setItem('token_type', token_type);
            localStorage.setItem('scope', scope);

            console.log('Access TokenRefresh:', access_token);
            return access_token;
        } else {
            console.error('Failed to refresh access token:', response.data);
            return null;
        }
    } catch (error) {
        console.error('Error refreshing access token:', error);
        return null;
    }
};

const getAccessToken = async () => {
    const accessToken = localStorage.getItem('access_token');
    const expiresIn = localStorage.getItem('expires_in');
    const expirationTime = expiresIn ? parseInt(expiresIn) * 1000 : 0; // Convert to milliseconds
    const currentTime = new Date().getTime();

    if (!accessToken || expirationTime < currentTime) {
        // Access token doesn't exist or is expired, fetch a new one
        const code = new URLSearchParams(window.location.search).get('code');
        if (code) {
            return await getToken(code);
        } else {
            console.error('Authorization code not found.');
            return null;
        }
    } else {
        // Access token exists and is not expired
        return accessToken;
    }
};

const checkAndRefreshAccessToken = async ()=> {
    const expiresIn = localStorage.getItem('expires_in');
    const expirationTime = expiresIn ? parseInt(expiresIn) * 1000 : 0; // Convert to milliseconds
    const currentTime = new Date().getTime();

    if (expirationTime > 0 && expirationTime - currentTime < 60000) {
        // If token is about to expire or already expired, refresh it
        console.log('Access token is expired or about to expire. Refreshing...');
        return await refreshAccessToken();
    }
    return null;
};

// Initialize the application
const initializeApp = async () => {
    const accessToken = await getAccessToken();
    if (accessToken) {
        // Application initialized successfully, do whatever you need to do
        console.log('Application initialized successfully.');
    } else {
        console.error('Failed to initialize application.');
    }
};

initializeApp();

setInterval(checkAndRefreshAccessToken, 60000); // Check every minute and refresh if necessary
</script>

<template>
  <div @click="changeLoginStatus" class="absolute top-5 right-5 h-16 w-16">
    <HAvatar url="/profile-picture-5.jpg"> </HAvatar>
  </div>
  <div
    class="flex flex-col items-center justify-center space-y-3s bg-primary-300 min-h-screen"
  >
    <img
      class="rounded-full w-96 h-96, flex justify-center, align-middle"
      src="/hitstar.jpg"
      alt="image description"
    />

    <div class="items-center space-y-3 grid-cols-2 gap-4">
      <RouterLink v-show="!isLoggedIn" to="/login">
        <HButton class="lg:m-5 m-10">Log in</HButton>
      </RouterLink>

      <RouterLink v-show="!isLoggedIn" to="/register">
        <HButton class="lg:m-5 m-10">Register</HButton>
      </RouterLink>
      <div class="items-center space-y-3 gap-4">
        <RouterLink v-show="isLoggedIn" to="/qr-code">
          <HButton>Start game</HButton>
        </RouterLink>
      </div>
    </div>
    <RouterLink to="/">
      <HButton class="lg:m-5 m-10">Game instructions</HButton>
    </RouterLink>
  </div>
</template>
