import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: HomeView
    },
    {
      path: '/notes',
      name: 'notes',
      component: () => import("/src/views/NotesView.vue"), 
    },
    {
      path: '/timer',
      name: 'timer',
      component: () => import("/src/views/TimerView.vue"), 
    },
    {
      path: '/millionaire',
      name: 'millionaire',
      component: () => import("/src/views/MillionaireView.vue"), 
    },
    
  ]
})

export default router
