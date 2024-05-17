import { createWebHashHistory, createRouter } from 'vue-router'
import ControllerLobbyScreen from '../screens/ControllerLobbyScreen.vue'
import ControllerScreen from '../screens/ControllerScreen.vue'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', redirect: '/controller' },
    { path: '/controller-lobby/:sessionId', component: ControllerLobbyScreen },
    { path: '/controller', component: ControllerScreen },
  ],
})