import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Score from '../components/ScoreBoard.vue';
import LoginScreen from '../components/LoginScreen.vue';
import Game from '../App.vue';
import Page1 from '../pages/page1.vue';
import Draw from '../pages/draw.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '',
      component: Draw
    },
    {
      path: '/page1',
      name: 'page1',
      component: Page1,
      children: [{
        path: 'score',
        components: {second: Score}
      },
      {
        path: 'game',
        components: {second: Game}
      },
      {
        path: 'login',
        components: {second: LoginScreen}
      }]
    },
    // {
    //   path: '/score',
    //   name: 'score',
    //   components: {second: Score}
    // },
    // {
    //   path: '/game',
    //   name: 'game',
    //   components: {second: Game}
    // },
    // {
    //   path: '/login',
    //   name: 'login',
    //   components: {second: LoginScreen}
    // },
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
