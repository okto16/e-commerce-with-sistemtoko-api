import { createRouter, createWebHistory } from 'vue-router'
// layouts
import UserLayout from '@/components/layout/UserLayout.vue'

// views for User layout
import HomeView from '@/views/HomeView.vue'
// import History from '@/views/user/History.vue'
import Profile from '@/views/user/Profile.vue'
import ShoppingCart from '@/views/user/ShoppingCart.vue'
import DashboardUser from '@/views/user/Dashboard.vue'

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
      {

        path: '/shoppingcart',
        name: 'shopping cart',
        component: ShoppingCart
      },
      {

        path: '/profile',
        name: 'profile',
        component: Profile
      },
      // {

      //   path: '/riwayatpesanan',
      //   name: 'riwayatpesanan',
      //   component: History
      // },
      {

        path: '/dashboard',
        name: 'dashboard-user',
        component: DashboardUser
      }      
      ]
    },
  ]
})

export default router