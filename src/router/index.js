import { createRouter, createWebHistory } from 'vue-router'
// layouts
import UserLayout from '@/components/layout/UserLayout.vue'

// views for User layout
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: UserLayout,
      children: [
        {     
        path: '/',
        name: 'home',
        component: HomeView
      },
      // {

      //   path: '/riwayatpesanan',
      //   name: 'riwayatpesanan',
      //   component: History
      // },
      ]
    },
  ]
})

export default router