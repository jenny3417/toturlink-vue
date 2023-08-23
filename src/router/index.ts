import { createRouter, createWebHistory } from 'vue-router'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/myfavoriate',
      name: 'myfavoriate',
      component: () => import('../views/Favoriate.vue')
    },
    {
      path: '/shoppingcart',
      name: 'shoppingcart',
      component: () => import('../views/Shoppingcart.vue')
    },
    {
      path: '/score',
      name: 'score',
      component: () => import('../views/Score.vue')
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: () => import('../views/Calendar.vue')
    }
  ]
})

export default router
