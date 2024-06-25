import { createWebHashHistory, createRouter } from 'vue-router'
import DesignSettingsScreen from '../screens/DesignSettingsScreen.vue'
import EndScreen from '../screens/EndScreen.vue'
import GameScreen from '../screens/GameScreen.vue'
import GameSettingsScreen from '../screens/GameSettingsScreen.vue'
import LoginScreen from '../screens/LoginScreen.vue'
import QRCodeScreen from '../screens/QRCodeScreen.vue'
import RegisterScreen from '../screens/RegisterScreen.vue'
import StartScreen from '../screens/StartScreen.vue'
import SpotifyLogin from '@screens/SpotifyLogin.vue'
import GameInstructions from '@screens/GameInstructions.vue'

const code = new URLSearchParams(window.location.search).get("code"); // get access code
let redirectUrl = '/start';
if (code){
  redirectUrl = '/spotify-login';
}

export const router = createRouter({
  history: createWebHashHistory(),

  routes: [
    //{ path: '/', redirect: '/start' },
   { path: '/', redirect: redirectUrl },
    { path: '/design-settings', component: DesignSettingsScreen },
    { path: '/end', component: EndScreen },
    { path: '/game', component: GameScreen },
    { path: '/game-settings', component: GameSettingsScreen },
    { path: '/login', component: LoginScreen },
    { path: '/qr-code', component: QRCodeScreen },
    { path: '/register', component: RegisterScreen },
    { path: '/start', component: StartScreen },
    { path: '/spotify-login', component: SpotifyLogin },
    {path: '/game-instructions', component: GameInstructions},

  ],
})