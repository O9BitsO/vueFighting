import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Score from '../components/ScoreBoard.vue';
import LoginScreen from '../components/LoginScreen.vue';
import Game from '../App.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/score',
      name: 'score',
      component: Score
    },
    {
      path: '/game',
      name: 'game',
      component: Game
    },
    {
      path: '/login',
      name: 'login',
      component: LoginScreen
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
