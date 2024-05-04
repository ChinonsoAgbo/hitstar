import { createWebHashHistory, createRouter } from 'vue-router'
import ControllerLobbyScreen from '../screens/ControllerLobbyScreen.vue'
import ControllerScreen from '../screens/ControllerScreen.vue'
import DesignSettingsScreen from '../screens/DesignSettingsScreen.vue'
import EndScreen from '../screens/EndScreen.vue'
import GameScreen from '../screens/GameScreen.vue'
import GameSettingsScreen from '../screens/GameSettingsScreen.vue'
import LoginScreen from '../screens/LoginScreen.vue'
import QRCodeScreen from '../screens/QRCodeScreen.vue'
import RegisterScreen from '../screens/RegisterScreen.vue'
import StartScreen from '../screens/StartScreen.vue'
import Test from '../screens/Test.vue'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', redirect: '/start' },
    { path: '/controller-lobby', component: ControllerLobbyScreen },
    { path: '/controller', component: ControllerScreen },
    { path: '/design-settings', component: DesignSettingsScreen },
    { path: '/end', component: EndScreen },
    { path: '/game', component: GameScreen },
    { path: '/game-settings', component: GameSettingsScreen },
    { path: '/login', component: LoginScreen },
    { path: '/qr-code', component: QRCodeScreen },
    { path: '/register', component: RegisterScreen },
    { path: '/start', component: StartScreen },
    { path: '/test', component: Test },


  ],
})